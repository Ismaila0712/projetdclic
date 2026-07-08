<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Passer une commande (à partir du panier en base de données)
     */
    public function store(Request $request)
    {
        $user = $request->user();

        // Récupérer tous les articles du panier de l'utilisateur
        $cartItems = Cart::with('product')
            ->where('user_id', $user->id)
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json([
                'message' => 'Votre panier est vide.'
            ], 400);
        }

        $total = 0;
        $orderProducts = [];

        foreach ($cartItems as $cart) {
            $product = $cart->product;
            if (!$product) {
                continue;
            }

            $subtotal = $cart->price * $cart->quantity;
            $total += $subtotal;

            $orderProducts[] = [
                'product_id' => $product->id,
                'quantity' => $cart->quantity,
                'price' => $cart->price,
            ];
        }

        // Créer la commande
        $order = Order::create([
            'user_id' => $user->id,
            'total_price' => $total,
            'status' => 'pending',
        ]);

        // Attacher les produits à la commande (table pivot)
        foreach ($orderProducts as $op) {
            $order->products()->attach($op['product_id'], [
                'quantity' => $op['quantity'],
                'price' => $op['price'],
            ]);
        }

        // Vider le panier de l'utilisateur après la commande
        Cart::where('user_id', $user->id)->delete();

        return response()->json([
            'message' => 'Commande passée avec succès !',
            'order' => $order->load('products'),
        ], 201);
    }

    /**
     * Récupérer l'historique des commandes de l'utilisateur connecté
     */
    public function index(Request $request)
    {
        $orders = $request->user()
            ->orders()
            ->with('products')
            ->latest()
            ->get();

        return response()->json($orders);
    }

    /**
     * Récupérer le détail d'une commande spécifique
     */
    public function show(Request $request, $id)
    {
        $order = Order::with('products')->findOrFail($id);

        // Vérifier que l'utilisateur est propriétaire OU admin
        if ($order->user_id !== $request->user()->id && !$request->user()->is_admin) {
            return response()->json([
                'message' => 'Non autorisé.'
            ], 403);
        }

        return response()->json($order);
    }

    /**
     * (Admin) Récupérer toutes les commandes de tous les utilisateurs
     */
    public function adminIndex(Request $request)
    {
        if (!$request->user()->is_admin) {
            return response()->json([
                'message' => 'Non autorisé.'
            ], 403);
        }

        $orders = Order::with(['user', 'products'])
            ->latest()
            ->get();

        return response()->json($orders);
    }

    /**
     * (Admin) Mettre à jour le statut d'une commande
     */
    public function adminUpdateStatus(Request $request, $id)
    {
        if (!$request->user()->is_admin) {
            return response()->json([
                'message' => 'Non autorisé.'
            ], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,completed,cancelled',
        ]);

        $order = Order::findOrFail($id);
        $order->status = $validated['status'];
        $order->save();

        return response()->json([
            'message' => 'Statut mis à jour avec succès.',
            'order' => $order,
        ]);
    }
}
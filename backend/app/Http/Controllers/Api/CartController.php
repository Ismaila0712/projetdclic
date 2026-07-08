<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller {

    // Récupérer le panier de l'utilisateur connecté
    public function index(Request $request) {
        $cartItems = Cart::with('product')
            ->where('user_id', $request->user()->id)
            ->get();

        $items = [];
        $total = 0;

        foreach ($cartItems as $cart) {
            $product = $cart->product;
            $subtotal = $cart->price * $cart->quantity;
            $total += $subtotal;

            $items[] = [
                'product' => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'price' => number_format($product->price, 2, ',', ' '),
                    'price_raw' => (float) $product->price,
                    'image_url' => $product->image_url,
                    'category' => $product->category?->name,
                ],
                'quantity' => $cart->quantity,
                'subtotal' => number_format($subtotal, 2, ',', ' '),
            ];
        }

        return response()->json([
            'items' => $items,
            'total' => number_format($total, 2, ',', ' '),
        ]);
    }

    // Ajouter un produit au panier (ou augmenter la quantité)
    public function add(Request $request) {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($validated['product_id']);

        $cart = Cart::where('user_id', $request->user()->id)
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($cart) {
            // Mise à jour de la quantité
            $cart->quantity += $validated['quantity'];
            $cart->save();
        } else {
            // Création d'une nouvelle entrée
            Cart::create([
                'user_id' => $request->user()->id,
                'product_id' => $validated['product_id'],
                'quantity' => $validated['quantity'],
                'price' => $product->price, // on fige le prix actuel
            ]);
        }

        return response()->json(['message' => 'Produit ajouté au panier.']);
    }

    // Mettre à jour la quantité d'un article
    public function update(Request $request, $productId) {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:0',
        ]);

        $cart = Cart::where('user_id', $request->user()->id)
            ->where('product_id', $productId)
            ->first();

        if (!$cart) {
            return response()->json(['message' => 'Article non trouvé dans le panier.'], 404);
        }

        if ($validated['quantity'] <= 0) {
            $cart->delete();
            return response()->json(['message' => 'Article retiré du panier.']);
        }

        $cart->quantity = $validated['quantity'];
        $cart->save();

        return response()->json(['message' => 'Quantité mise à jour.']);
    }

    // Supprimer un article du panier
    public function remove(Request $request, $productId) {
        $cart = Cart::where('user_id', $request->user()->id)
            ->where('product_id', $productId)
            ->first();

        if (!$cart) {
            return response()->json(['message' => 'Article non trouvé.'], 404);
        }

        $cart->delete();

        return response()->json(['message' => 'Article retiré du panier.']);
    }

    // Vider tout le panier
    public function clear(Request $request) {
        Cart::where('user_id', $request->user()->id)->delete();
        return response()->json(['message' => 'Panier vidé.']);
    }
}
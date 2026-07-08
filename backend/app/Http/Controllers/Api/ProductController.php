<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller {
    public function index(Request $request) {
        $query = Product::with('category');

        if ($request->has('q')) {
            $query->where('name', 'LIKE', '%'.$request->q.'%')
                  ->orWhere('description', 'LIKE', '%'.$request->q.'%');
        }
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        return response()->json($query->paginate(12));
    }

    public function show(Product $product) {
        return response()->json($product->load('category'));
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image_url' => 'nullable|url',
            'category_id' => 'required|exists:categories,id',
        ]);
        $product = Product::create($validated);
        return response()->json($product, 201);
    }

    public function update(Request $request, Product $product) {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'image_url' => 'nullable|url',
            'category_id' => 'sometimes|exists:categories,id',
        ]);
        $product->update($validated);
        return response()->json($product);
    }

    public function destroy(Product $product) {
        $product->delete();
        return response()->json(['message' => 'Produit supprimé.']);
    }
}
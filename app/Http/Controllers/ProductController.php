<?php

namespace App\Http\Controllers;

use App\Models\Attributes;
use App\Models\Products;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index () {
        $products = Products::with('attributes', 'attributes.options')->get();
        $attributes = Attributes::all();

        // dd($products);
        return Inertia::render('Admin/Products', ['products' => $products, 'attributes' => $attributes]);
    }

    public function view () {
        $product = Products::all();

        return Inertia::render('Admin/Products', ['products' => $product]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $request->validate([
        //     'product_name' => 'required|string|max:255',
        //     'product_price' => 'required|int|max:255',
        //     'product_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        // ]);

        if ($request->has('product_image')) {
            $imagePath = $request->file('product_image');
            $name = time() . '.' . $imagePath->getClientOriginalExtension();
            $imagePath->move('images/products', $name);
        }

        Products::create([
            'product_name' => $request->product_name,
            'product_price' => $request->product_price,
            'product_image' => $name
        ]);

        return to_route('admin.products')->with('success', 'Product Successfully Added');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

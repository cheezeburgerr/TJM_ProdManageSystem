<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    //

    public function add_picture (Request $request) {
        if ($request->has('image')) {
            $imagePath = $request->file('image');
            $name = time() . '.' . $imagePath->getClientOriginalExtension();
            $imagePath->move('images/gallery', $name);
        }

        Gallery::create([
            'image' => $name,
            'name' => $request->name,
            'description' => $request->description,
            'product_id' => $request->product_id
        ]);

        return to_route('employee.gallery')->with('success', 'Picture Successfully Added');
    }
}

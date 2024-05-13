<?php

namespace App\Http\Controllers;

use App\Jobs\SendMessage;
use App\Models\Gallery;
use App\Models\Messages;
use App\Models\Products;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PagesController extends Controller
{
    //

    public function dashboard () {

        $products = Products::all();
        $gallery = Gallery::with('products')->inRandomOrder()->limit(6)->get();

        return Inertia::render('Dashboard', ['products' => $products, 'gallery' => $gallery]);

    }

    public function messages(): JsonResponse {
        $messages = Messages::with('user')->get()->append('time');

        return response()->json($messages);
    }

    public function message(Request $request): JsonResponse {
        $message = Messages::create([
            'user_id' => auth()->id(),
            'message' => $request->get('text'),
        ]);
        SendMessage::dispatch($message);

        return response()->json([
            'success' => true,
            'message' => "Message created and job dispatched.",
        ]);
    }
    public function gallery () {

        $gallery = Gallery::with('products')->get();
        return Inertia::render('ProductGallery', ['pics' => $gallery]);
    }

    public function show_pic ($id) {
        $picture = Gallery::with('products', 'products.attributes.options')->find($id);

        // dd($picture);
        $gallery = Gallery::with('products')->where('product_id', $picture->product_id)->inRandomOrder()->limit(4)->get();
        return Inertia::render('GalleryInfo', ['picture' => $picture, 'gallery' => $gallery]);
    }
}

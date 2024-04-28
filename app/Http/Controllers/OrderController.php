<?php

namespace App\Http\Controllers;

use App\Models\AttributeOptions;
use App\Models\Lineup;
use App\Models\Order;
use App\Models\OrderAttributesOption;
use App\Models\ProductionDetails;
use App\Models\Products;
use App\Models\User;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{

    public function order($id)
    {


        $product = Products::with('attributes.options')->find($id);
        $options = AttributeOptions::where('attributes_id', $product->id)->get();

        // dd($product);
        return Inertia::render('Order', ['products' => $product]);
    }
    public function show_products()
    {
        return Inertia::render('OrderCategory', ['products' => Products::all()]);
    }

    public function downpayment($id)
    {

        $order = Order::select('*', 'orders.id AS order_id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->with('products.attributes', 'attributes', 'lineups')->find($id);


        return Inertia::render('Downpayment', ['order' => $order]);
    }

    public function configurator() {

        return Inertia::render('Tshirt');
    }

    public function store(Request $request)
    {

        $request->validate([
            'team_name' => 'required|string|max:255',
            'due_date' => 'required|date',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            // Add validation rules for other form fields if needed
        ]);

        // Store image file
        if ($request->has('image')) {
            $imagePath = $request->file('image');
            $name = time() . '.' . $imagePath->getClientOriginalExtension();
            $imagePath->move('images/customers', $name);
        }


        // Create new order record

        $id = Auth::id();

        $production_details = ProductionDetails::create([
            'status' => 'Pending'
        ]);

        $order = new Order();
        $order->team_name = $request->team_name;
        $order->due_date = $request->due_date;
        $order->design = $name;
        $order->order_price = $request->order_price;
        $order->customer_id = $id;
        $order->production_details_id = $production_details->production_details_id;
        $order->product_id = $request->product_id;
        $order->save();

        // Store selected options for each attribute
        foreach ($request->all() as $key => $value) {
            // Check if the key corresponds to an attribute ID
            if (is_numeric($key) && !in_array($key, ['team_name', 'due_date', 'image'])) {
                // Create a record in OrderAttributesOptions table
                $orderAttributesOptions = new OrderAttributesOption();
                $orderAttributesOptions->order_id = $order->id;
                $orderAttributesOptions->option_id = $value; // Assuming the value is the option ID
                $orderAttributesOptions->save();
            }
        }

        // return Inertia::render('Dashboard')->with('success', 'Order created successfully');
        return response()->json([
            'id' => $order->id,
        ], 200);
    }

    protected function failedValidation(Validator $validator)
    {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    public function lineup($id)
    {

        $order = Order::with('products')->find($id);
        return Inertia::render('Lineup', ['order' => $order, 'order_id' => $id]);
    }

    public function get_lineup($id)
    {

        $lineup = Lineup::where('order_id', $id)->get();
        return response()->json($lineup);
    }

    public function edit_lineup($id)
    {
        $lineup = Lineup::find($id);

        return response()->json([
            'player' => $lineup
        ]);
    }

    public function store_lineup(Request $request, $id)
    {


        $order = Order::find($id);
        $order_price = $order->order_price;
        $p = $order_price;
        // Validate the incoming request data
        $validatedData = $request->validate([
            'input.*.player_name' => 'required|string',
            'input.*.player_details' => 'nullable|string',
            'input.*.classification' => 'required|string',
            'input.*.gender' => 'required|string',
            'input.*.upper_size' => 'nullable|string',
            'input.*.short_size' => 'nullable|string',
            'input.*.short_name' => 'nullable|string',
        ]);

        // Loop through the validated data and create Lineup instances
        foreach ($validatedData['input'] as $inputData) {

            if ($inputData['classification'] === 'Kid') {
                $p = $order_price - 50.0;
            }
            $inputData['order_id'] = $id;
            $inputData['lineup_price'] = $p;
            $p = $order_price;
            Lineup::create($inputData);
        }


        $prices = Lineup::where('order_id', $id)->get();
        $totalPrice = 0;
        foreach ($prices as $price) {
            $totalPrice += $price->lineup_price;
        }
        $order->total_price = $totalPrice;
        $order->save();

        // Optionally, you can redirect the user back or to another page
        return redirect()->route('dashboard')->with('success', 'Lineup submitted successfully');
    }

    public function get_details($id)
    {

        $data = Order::select('*', 'orders.id AS order_id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->with('products.attributes', 'attributes', 'lineups')->find($id);

        // dd($data);
        if (!$data) {
            // Log an error if the order is not found
            Log::error('Order not found for ID: ' . $id);
            return response()->json(['error' => 'Order not found'], 404);
        }

        // Log the retrieved order details for debugging
        Log::info('Order details retrieved: ' . $data);
        return response()->json($data);
    }

    public function edit_order($id)
    {
        $order = Order::with('products.attributes', 'attributes', 'products.attributes.options')->find($id);
        // dd($order);
        return Inertia::render('EditOrder', ['order' => $order]);
    }

    public function update_order(Request $request, $id)
    {
        // Find the order by its ID
        $order = Order::findOrFail($id);

        // Validate the incoming request data
        $validatedData = $request->validate([
            'team_name' => 'required|string',
            'due_date' => 'required|date',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Assuming image is uploaded via the form
            // Add validation rules for other fields if needed
        ]);

        // Update order fields
        $order->team_name = $validatedData['team_name'];
        $order->due_date = $validatedData['due_date'];

        // Handle image update if provided
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/customers'), $imageName);
            $order->design = $imageName;
        }

        // Save the updated order
        $order->save();

        // Return a response indicating success
        return response()->json(['message' => 'Order updated successfully', 'order' => $order]);
    }

    public function update_player(Request $request, $id)
    {
        $player = Lineup::findOrFail($id);
        $order = Order::find($player->order_id);

        $price = $order->order_price;

        // Validate the incoming request data
        $validatedData = $request->validate([
            'player_name' => 'required|string',
            'player_details' => 'nullable|string',
            'classification' => 'required|in:Adult,Kid',
            'gender' => 'required|in:Male,Female',
            'upper_size' => 'nullable|string',
            'short_size' => 'nullable|string',
            'short_name' => 'nullable|string',
            // Add validation rules for other fields if needed
        ]);

        // Update player fields
        if ($validatedData['classification'] === 'Kid') {
            $validatedData['lineup_price'] = $price - 50;
        } else {
            $validatedData['lineup_price'] = $price;
        }
        $player->update($validatedData);

        $prices = Lineup::where('order_id', $order->id)->get();


        $totalPrice = 0;
        foreach ($prices as $price) {
            $totalPrice += $price->lineup_price;
        }
        $order->total_price = $totalPrice;
        $order->save();

        // Return a response indicating success
        return response()->json(['message' => 'Player details updated successfully', 'player' => $player]);
    }

    public function delete_player(Request $request, $id)
    {
        $player = Lineup::findOrFail($id);

        $player->delete();
        $order = Order::find($player->order_id);

        $price = $order->order_price;



        $prices = Lineup::where('order_id', $order->id)->get();


        $totalPrice = 0;
        foreach ($prices as $price) {
            $totalPrice += $price->lineup_price;
        }
        $order->total_price = $totalPrice;
        $order->save();

        // Return a response indicating success
        return response()->json(['message' => 'Player details deleted successfully', 'player' => $player]);
    }

}


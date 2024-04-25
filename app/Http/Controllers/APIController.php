<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Lineup;
use App\Models\Order;
use App\Models\ProductionDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class APIController extends Controller
{
    //

    public function get_teams() {

        $employee = Auth::guard('employee')->user();
        $order = Order::select('*', 'orders.id AS order_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->leftJoin('employees', 'production_details.artist_id', 'employees.employee_id')->with('products.attributes', 'attributes')->orderBy('orders.due_date', 'desc')->where('production_details.artist_id', $employee->employee_id)->get();

        return response()->json($order);
    }

    public function fetch_pending()
    {
        $teams =  Order::select('*', 'orders.id AS order_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->where('production_details.status', 'Pending')->get();

        return response()->json($teams);
    }

    public function withoutArtist()
    {
        $teams =  Order::select('*', 'orders.id AS order_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->where('production_details.artist_id', null)->where('production_details.status', 'Designing')->get();

        return response()->json($teams);
    }

    public function approve(Request $request)
    {
        $order = ProductionDetails::find($request->order_id);
        $order->status = 'Designing';

        $order->save();

        return response()->json(['message' => 'Order status updated successfully'], 200);
    }

    public function assign(Request $request, $id)
    {
        $order = ProductionDetails::findOrFail($id);

        $order->artist_id = $request->option;
        $order->save();

        return response()->json(['message' => 'Order status updated successfully'], 200);
    }

    public function assign_printer(Request $request, $id)
    {
        $order = ProductionDetails::findOrFail($id);

        $order->printer_id = $request->option;
        $order->status = "Ready to Print";
        $order->save();

        return response()->json(['message' => 'Order status updated successfully'], 200);
    }

    public function update_lineup_status (Request $request, $id) {
        $lineup = Lineup::find($id);

        $lineup->status = $request->printed;
        $lineup->save();

        $progress = ProductionDetails::find($request->prodId);
        $progress->progress = $request->progress;
        $progress->save();
    }

    public function update_printing (Request $request, $id) {
        $order = ProductionDetails::find($id);

        $order->status = $request->status;
        $order->save();
    }


    public function return_records (Request $request) {
        $uncheckedRecordIds = $request->input('uncheckedRecords');
        $errorType = $request->input('errorType');

        try {
            // Update the status of unchecked records to 'error'
            Lineup::whereIn('id', $uncheckedRecordIds)->update(['status' => 'Error']);

            // Update the note column with the error type
            Lineup::whereIn('id', $uncheckedRecordIds)->update(['note' => $errorType]);

            // Return a success response
            return response()->json(['message' => 'Lineup errors updated successfully'], 200);
        } catch (\Exception $e) {
            // Return an error response if something went wrong
            return response()->json(['message' => 'Error updating lineup errors', 'error' => $e->getMessage()], 500);
        }
    }

    public function get_errors($id){
        $lineup = Lineup::where('order_id', $id)->where('status', 'Error')->get();

        return response()->json($lineup);
    }

    public function reprint_errors(Request $request, $id){
        $lineup = Lineup::where('order_id', $id)->where('status', 'Error')->get();

        foreach($lineup as $l){
            $l->status = $request->status;
            $l->save();
        }

        return response()->json($lineup);
    }

    public function updateStatus(Request $request, Equipment $printer)
    {
        $validatedData = $request->validate([
            'equipment_status' => 'required|in:Working,Under Maintenance',
        ]);

        $printer->update($validatedData);

        return response()->json(['message' => 'Printer status updated successfully'], 200);
    }
}

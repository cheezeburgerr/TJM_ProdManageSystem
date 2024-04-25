<?php

namespace App\Http\Controllers;

use App\Models\Lineup;
use App\Models\Order;
use App\Models\ProductionDetails;
use Illuminate\Http\Request;

class TeamsController extends Controller
{
    //
    public function index () {

        return view('employee.teams');
    }

    public function pending () {
        return view('employee.pending-teams');
    }

    public function approve ($id) {
        $order = ProductionDetails::where('order_id', $id)->first();
        //dd($order);
        $order->update(['status' => 'Designing']);
        return redirect()->back();
    }

    public function print ($id) {

        $order = Order::leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->where('orders.id', $id)->first();

        return view('employee.print', compact('order'));
    }

    public function setErrors(Request $request) {

            $ids = $request->input('ids', []);
            $notes = $request->input('note', []);

            // Iterate over each record ID and update the corresponding record
            foreach ($ids as $key => $id) {
                // Retrieve selected checkboxes' values for the current record
                $selectedNotes = isset($notes[$key]) ? implode(',', $notes[$key]) : null;

                // Update the record in the database
                Lineup::where('id', $id)->update([
                    'note' => $selectedNotes,
                    'status' => 'Error'
                    // Other fields you may want to update
                ]);
            }

            // Redirect or do anything after updating records
            return redirect()->route('teams.index')->with('success', 'Form submitted successfully!');

    }

    public function production() {
        return view('employee.production');
    }
}

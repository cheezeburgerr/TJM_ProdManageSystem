<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Equipment;
use App\Models\Lineup;
use App\Models\Order;
use App\Models\OrderDetails;
use App\Models\ProductionDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function login()
    {
        if (Auth::guard('admin')->check()) {
            return redirect()->route('admin.dashboard');
        }
        return Inertia::render('Admin/Login');
    }

    //todo: employee login functionality
    public function login_functionality(Request $request)
    {
        // dd('check');
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        if (Auth::guard('admin')->attempt(['email' => $request->email, 'password' => $request->password])) {
            //return redirect()->route('dashboard');
            $employee = Auth::guard('admin')->user();

            // Store user information in the session
            session(['admin' => $employee]);

            return redirect()->intended('/admin/dashboard');
        } else {
            Session::flash('error-message', 'Invalid Email or Password');
            return back();
        }
    }

    public function dashboard()
    {
        $statusArray = ['Ready to Print', 'Printing', 'Printed'];
        $employee = Auth::guard('admin')->user();

        $order = Order::select('*', 'orders.id AS order_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->leftJoin('employees', 'production_details.artist_id', 'employees.employee_id')->with('products.attributes', 'attributes')->orderBy('orders.due_date', 'desc')->where('status', '!=', 'Pending')->get();




        $query = ProductionDetails::all();

        $boxes =
            [
                ['title' => 'Teams', 'count' => $query->where('status', '!=', 'Finished')->count()],
                ['title' => 'Designing', 'count' => $query->where('status', 'Designing')->count()],
                ['title' => 'Production', 'count' => $query->whereIn('status', $statusArray)->count()],
                ['title' => 'Finished', 'count' => $query->where('artist_id', $employee->employee_id)->where('status', 'Finished')->count()],
            ];




        return Inertia::render('Admin/Dashboard', ['boxes' => $boxes, 'order' => $order]);
    }


    public function teams()
    {
        $statusArray = ['Ready to Print', 'Printing', 'Printed'];
        $employee = Auth::guard('employee')->user();

        $order = Order::select('*', 'orders.id AS order_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->leftJoin('employees', 'production_details.artist_id', 'employees.employee_id')->with('products.attributes', 'attributes')->orderBy('orders.due_date', 'desc')->where('status', '!=', 'Pending')->get();

        $artists = Employee::where('department_id', 1)->get();
        $printers = Equipment::where('equipment_type', 'printer')->where('equipment_status', 'Working')->get();




        return Inertia::render('Admin/Teams', ['order' => $order, 'artists' => $artists, 'printers' => $printers]);
    }



    public function pending_teams()
    {

        $order = Order::select('*', 'orders.id AS order_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->where('production_details.status', 'Pending')->get();
        return Inertia::render('Admin/PendingTeams', ['order' => $order]);
    }



    public function production() {
        $statusArray = ['Ready to Print', 'Printing', 'Printed'];
        $employee = Auth::guard('employee')->user();

        $order = Order::select('*', 'orders.id AS order_id')->selectRaw('(SELECT COUNT(*) FROM lineups WHERE lineups.order_id = orders.id AND lineups.status = "Error") AS error_count')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->leftJoin('employees', 'production_details.artist_id', 'employees.employee_id')->with('products.attributes', 'attributes')->orderBy('orders.due_date', 'desc')->whereIn('production_details.status', $statusArray)->get();




        return Inertia::render('Admin/Production', ['order' => $order]);
    }

    public function printers(){
        $printers = Equipment::select('*')->selectRaw('(SELECT COUNT(*) FROM production_details WHERE production_details.printer_id = equipment.id) AS printer_count')->where('equipment_type', 'Printer')->get();


        return Inertia::render('Admin/Printers', ['printers' => $printers]);
    }
    public function logout()
    {
        Auth::guard('admin')->logout();
        return redirect()->route('admin.login');
    }
}

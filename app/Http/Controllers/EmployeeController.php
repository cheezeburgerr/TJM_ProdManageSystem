<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Equipment;
use App\Models\Gallery;
use App\Models\Lineup;
use App\Models\Order;
use App\Models\OrderDetails;
use App\Models\ProductionDetails;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class EmployeeController extends Controller
{

    public  $noArray = ['Cancelled', 'Pending'];
    public $statusArray = ['Ready to Print', 'Printing', 'Printed', 'Sewing', 'Finished'];
    public function login()
    {
        if (Auth::guard('employee')->check()) {
            return redirect()->route('employee.dashboard');
        }
        return Inertia::render('Employee/Login');
    }

    //todo: employee login functionality
    public function login_functionality(Request $request)
    {
        // dd('check');
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        if (Auth::guard('employee')->attempt(['email' => $request->email, 'password' => $request->password])) {
            //return redirect()->route('dashboard');
            $employee = Auth::guard('employee')->user();

            // Store user information in the session
            session(['employee' => $employee]);

            return redirect()->intended('/employee/dashboard');
        } else {
            Session::flash('error-message', 'Invalid Email or Password');
            return back();
        }
    }

    public function dashboard()
    {
        $statusArray = ['Ready to Print', 'Printing', 'Printed', 'Sewing'];
        $employee = Auth::guard('employee')->user();


        $query = Order::select('*', 'orders.id AS order_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->leftJoin('employees', 'production_details.artist_id', 'employees.employee_id')->with('products.attributes', 'attributes', 'lineups', 'customer')->limit(3);



        if ($employee->department_id === 1) {
            $order = $query->where('production_details.artist_id', $employee->employee_id)->get();

        } else if ($employee->department_id === 4) {
            $order = $query->whereIn('status', $statusArray)->get();
        } else {
            $order = $query->whereNotIn('status', $this->noArray)->get();
        }

        $production = $query->whereIn('production_details.status', $statusArray)->get();

        // dd($production);

        $startDate = Carbon::now()->startOfWeek(); // Start of the week (Sunday)
        $endDate = Carbon::now()->endOfWeek(); // End of the week (Saturday)

        $query = $employee->department_id === 1 ? Employee::find($employee->employee_id)->teams : ProductionDetails::all();

        $boxes =
            [
                ['title' => 'Teams', 'count' => $query->whereNotIn('status', ['Pending', 'Finished', 'Received'])->count(), 'plus' => $query->whereNotIn('status', $this->noArray)->whereBetween('created_at', [$startDate, $endDate])->count()],
                ['title' => 'Designing', 'count' => $query->where('status', 'Designing')->count(), 'plus' => $query->where('status', 'Design Approved')->count() ],
                ['title' => 'Production', 'count' => $query->whereIn('status', $statusArray)->count(), 'plus' => $query->where('status', 'Sewing')->whereBetween('updated_at', [$startDate, $endDate])->count()],
                ['title' => 'Finished', 'count' => $query->where('status', 'Finished')->count(), 'plus' => $query->where('status', 'Finished')->whereBetween('updated_at', [$startDate, $endDate])->count()],
            ];




        return Inertia::render('Employee/Dashboard', ['boxes' => $boxes, 'order' => $order, 'production' => $production]);
    }


    public function teams()
    {
        $statusArray = ['Ready to Print', 'Printing', 'Printed', 'Sewing'];
        $employee = Auth::guard('employee')->user();


        $order = Order::select('*', 'orders.id AS order_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->leftJoin('equipment', 'production_details.printer_id', 'equipment.id')->leftJoin('employees', 'production_details.artist_id', 'employees.employee_id')->with('products.attributes', 'attributes', 'lineups', 'customer');

        // dd($order);
        $artists = Employee::where('department_id', 1)->get();
        $printers = Equipment::where('equipment_type', 'printer')->where('equipment_status', 'Working')->get();

        if ($employee->department_id === 1) {
            $order = $order->where('production_details.artist_id', $employee->employee_id)->get();
        } else if ($employee->department_id === 4 || $employee->department_id === 5) {
            $order = $order->whereIn('status', $statusArray)->get();
        } else {
            $order = $order->whereNotIn('status', $this->noArray)->get();
        }


        // dd($data);
        return Inertia::render('Employee/Teams', ['order' => $order, 'artists' => $artists, 'printers' => $printers]);
    }


    public function checking()
    {
        $statusArray = ['Ready to Print', 'Printing', 'Printed'];
        $employee = Auth::guard('employee')->user();


        $order = Order::select('*', 'orders.id AS order_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->leftJoin('equipment', 'production_details.printer_id', 'equipment.id')->leftJoin('employees', 'production_details.artist_id', 'employees.employee_id')->with('products.attributes', 'attributes', 'lineups', 'customer');

        // dd($order);
        $artists = Employee::where('department_id', 1)->get();
        $printers = Equipment::where('equipment_type', 'printer')->where('equipment_status', 'Working')->get();

        $order = $order->whereIn('status', $statusArray)->get();


        // dd($data);
        return Inertia::render('Employee/Checking', ['order' => $order, 'artists' => $artists, 'printers' => $printers]);
    }

    public function final_checking()
    {
        $statusArray = ['Sewed', 'Sewing'];
        $employee = Auth::guard('employee')->user();



        $order = Order::select('*', 'orders.id AS order_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->leftJoin('equipment', 'production_details.printer_id', 'equipment.id')->leftJoin('employees', 'production_details.artist_id', 'employees.employee_id')->with('products.attributes', 'attributes', 'lineups', 'customer');

        // dd($order);
        $artists = Employee::where('department_id', 1)->get();
        $printers = Equipment::where('equipment_type', 'printer')->where('equipment_status', 'Working')->get();

        $order = $order->whereIn('status', $statusArray)->get();


        // dd($data);
        return Inertia::render('Employee/FinalChecking', ['order' => $order, 'artists' => $artists, 'printers' => $printers]);
    }


    public function pending_teams()
    {


        $order = Order::select('*', 'orders.id AS order_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->leftJoin('employees', 'production_details.artist_id', 'employees.employee_id')->with('products.attributes', 'attributes', 'lineups', 'customer')->where('production_details.status', 'Pending')->get();
        return Inertia::render('Employee/PendingTeams', ['order' => $order]);
    }


    public function finished_teams()
    {


        $order = Order::select('*', 'orders.id AS order_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->leftJoin('employees', 'production_details.artist_id', 'employees.employee_id')->with('products.attributes', 'attributes', 'lineups', 'customer')->where('production_details.status', 'Finished')->get();
        return Inertia::render('Employee/FinishedTeams', ['order' => $order]);
    }



    public function print_order($id)
    {
        $order = Order::select('*', 'orders.id AS order_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->leftJoin('employees', 'production_details.artist_id', 'employees.employee_id')->with('products.attributes', 'attributes')->orderBy('orders.due_date', 'desc')->where('orders.id', $id)->first();

        return Inertia::render('Employee/Print', ['order' => $order]);
    }


    public function production()
    {
        $statusArray = ['Ready to Print', 'Printing', 'Printed', 'Sewing'];
        $employee = Auth::guard('employee')->user();

        $order = Order::select('*', 'orders.id AS order_id')->selectRaw('(SELECT COUNT(*) FROM lineups WHERE lineups.order_id = orders.id AND lineups.status = "Error") AS error_count')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('employees', 'production_details.artist_id', 'employees.employee_id')->with('products.attributes', 'attributes', 'lineups', 'customer')->orderBy('orders.due_date', 'desc')->whereIn('production_details.status', $statusArray)->where('production_details.artist_id', $employee->employee_id)->get();

        // dd($order);




        return Inertia::render('Employee/Production', ['order' => $order]);
    }

    public function gallery()
    {
        $gallery = Gallery::all();
        $products = Products::all();
        return Inertia::render('Employee/Gallery', ['gallery' => $gallery, 'products' => $products]);
    }
    public function printers()
    {
        $printers = Equipment::select('*')->selectRaw('(SELECT COUNT(*) FROM production_details WHERE production_details.printer_id = equipment.id) AS printer_count')->where('equipment_type', 'Printer')->get();


        return Inertia::render('Employee/Printers', ['printers' => $printers]);
    }
    public function logout()
    {
        Auth::guard('employee')->logout();
        return redirect()->route('employee.login');
    }

    public function check($id)
    {
        $order = Order::select('*', 'orders.id AS order_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->leftJoin('employees', 'production_details.artist_id', 'employees.employee_id')->with('products.attributes', 'attributes')->orderBy('orders.due_date', 'desc')->where('orders.id', $id)->first();


        return Inertia::render('Employee/Check', ['order' => $order]);
    }

    public function final_check($id)
    {
        $order = Order::select('*', 'orders.id AS order_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->leftJoin('employees', 'production_details.artist_id', 'employees.employee_id')->with('products.attributes', 'attributes')->orderBy('orders.due_date', 'desc')->where('orders.id', $id)->first();


        return Inertia::render('Employee/FinalCheck', ['order' => $order]);
    }

    public function reprint(){
        $orders = Order::select('*', 'orders.id AS order_id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->leftJoin('employees', 'production_details.artist_id', 'employees.employee_id')->with('products.attributes', 'attributes', 'lineups', 'customer')->whereIn('status', $this->statusArray)->get();



        // dd($orders);
        return Inertia::render('Employee/Reprints', ['order' => $orders]);
    }
}

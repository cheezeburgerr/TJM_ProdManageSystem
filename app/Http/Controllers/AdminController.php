<?php

namespace App\Http\Controllers;

use App\Models\Attributes;
use App\Models\Department;
use App\Models\Employee;
use App\Models\Equipment;
use App\Models\Lineup;
use App\Models\Order;
use App\Models\OrderDetails;
use App\Models\ProductionDetails;
use App\Models\Products;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Carbon;

class AdminController extends Controller
{

    public  $noArray = ['Cancelled', 'Pending', 'Received'];
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
            $admin = Auth::guard('admin')->user();

            // Store user information in the session
            session(['admin' => $admin]);

            return redirect()->intended('/admin/dashboard');
        } else {
            Session::flash('error-message', 'Invalid Email or Password');
            return back();
        }
    }

    public function dashboard()
    {
        $statusArray = ['Ready to Print', 'Printing', 'Printed'];
        $employee = Auth::guard('employee')->user();


        $query = Order::select('*', 'orders.id AS order_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->leftJoin('employees', 'production_details.artist_id', 'employees.employee_id')->with('products.attributes', 'attributes', 'lineups', 'customer')->limit(3);



            $order = $query->whereNotIn('status', $this->noArray)->get();
        $production = $query->whereIn('production_details.status', $statusArray)->get();

        // dd($production);

        $startDate = Carbon::now()->startOfWeek(); // Start of the week (Sunday)
        $endDate = Carbon::now()->endOfWeek(); // End of the week (Saturday)

        $query = ProductionDetails::all();

        $boxes =
            [
                ['title' => 'Teams', 'count' => $query->whereNotIn('status', ['Pending', 'Finished', 'Received'])->count(), 'plus' => $query->whereNotIn('status', $this->noArray)->whereBetween('created_at', [$startDate, $endDate])->count()],
                ['title' => 'Designing', 'count' => $query->where('status', 'Designing')->count(), 'plus' => $query->where('status', 'Design Approved')->count() ],
                ['title' => 'Production', 'count' => $query->whereIn('status', $statusArray)->count(), 'plus' => $query->where('status', 'Sewing')->whereBetween('updated_at', [$startDate, $endDate])->count()],
                ['title' => 'Finished', 'count' => $query->where('status', 'Finished')->count(), 'plus' => $query->where('status', 'Finished')->whereBetween('updated_at', [$startDate, $endDate])->count()],
            ];



        return Inertia::render('Admin/Dashboard', ['boxes' => $boxes, 'order' => $order, 'production' => $production]);
    }


    public function teams()
    {
        $statusArray = ['Ready to Print', 'Printing', 'Printed'];
        $employee = Auth::guard('employee')->user();

        $order = Order::select('*', 'orders.id AS order_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->leftJoin('employees', 'production_details.artist_id', 'employees.employee_id')->leftJoin('equipment', 'production_details.printer_id', 'equipment.id')->with('products.attributes', 'attributes')->orderBy('orders.due_date', 'desc')->whereNotIn('status', $this->noArray)->get();



        return Inertia::render('Admin/Teams', ['order' => $order]);
    }



    public function pending_teams()
    {

        $order = Order::select('*', 'orders.id AS order_id')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->where('production_details.status', 'Pending')->get();
        return Inertia::render('Admin/PendingTeams', ['order' => $order]);
    }



    public function production()
    {
        $statusArray = ['Ready to Print', 'Printing', 'Printed', 'Sewing'];
        $employee = Auth::guard('employee')->user();

        $order = Order::select('*', 'orders.id AS order_id')->selectRaw('(SELECT COUNT(*) FROM lineups WHERE lineups.order_id = orders.id AND lineups.status = "Error") AS error_count')->leftJoin('products', 'orders.product_id', 'products.id')->leftJoin('production_details', 'orders.production_details_id', 'production_details.production_details_id')->leftJoin('employees', 'production_details.artist_id', 'employees.employee_id')->with('products.attributes', 'attributes')->orderBy('orders.due_date', 'desc')->whereIn('production_details.status', $statusArray)->get();




        return Inertia::render('Admin/Production', ['order' => $order]);
    }

    public function printers()
    {
        $printers = Equipment::select('*')->selectRaw('(SELECT COUNT(*) FROM production_details WHERE production_details.printer_id = equipment.id) AS printer_count')->where('equipment_type', 'Printer')->get();


        return Inertia::render('Admin/Printers', ['printers' => $printers]);
    }
    public function logout()
    {
        Auth::guard('admin')->logout();
        return redirect()->route('admin.login');
    }

    public function employees()
    {
        $employees = User::where('user_type', 'Employee')->with('department')->get();
        // dd($employees);
        $departments = Department::all();
        // dd($employees);
        return Inertia::render('Admin/Employees', ['employees' => $employees, 'departments' => $departments]);
    }



    public function employee_store(Request $request)
    {

        $request->validate([

            'name' => 'required|string|max:255',
            'department_id' => 'required|int',
            'email' => 'required|string|lowercase|email|max:255',

        ]);

        $lastEmployee = User::where('user_type', 'Employee')->latest()->first();
        $lastId = $lastEmployee ? substr($lastEmployee->user_id, 4) : 0;
        $nextId = $lastId + 1;
        $customId = 'TJM_' . str_pad($nextId, 5, '0', STR_PAD_LEFT);

        $emp = User::create([
            'user_id' => $customId,
            'name' => $request->name,
            'email' => $request->email,
            'contact_number' => $request->contact_number,
            'address' => $request->address,
            'department_id' => $request->department_id,
            'password' => Hash::make('password'),
            'user_type' => 'Employee'
        ]);


        return to_route('admin.employees')->with('success', 'Employee Successfully Added');
    }
}

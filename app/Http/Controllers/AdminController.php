<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function login_form()
    {
        if (Auth::guard('admin')->check()) {
            return redirect()->route('admin.dashboard');
        }
        return view('admin.login');
    }

    //todo: employee login functionality
    public function login_functionality(Request $request)
    {
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
        return view('admin.dashboard');
    }

    //todo: employee logout functionality
    public function logout()
    {
        Auth::guard('admin')->logout();
        return redirect()->route('admin.loginform');
    }

    public function employees() {
        $department = Department::all();
        $employees = Employee::all();
        return view('admin.employees', compact('employees', 'department'));
    }
}

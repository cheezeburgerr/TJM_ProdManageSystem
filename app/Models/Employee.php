<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Employee extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public function hasRole($role)
{
    return $this->role === $role;
}
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

     protected $keyType = 'string';
     protected $primaryKey = 'emp_id';
     protected $guard = 'employee';
    protected $fillable = [
        'emp_id',
        'user_id',
        'department_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function department(){
        return $this->belongsTo(Department::class, 'department_id', 'id');
    }

    public function teams(){
        return $this->hasMany(ProductionDetails::class, 'artist_id', 'employee_id');
    }
}

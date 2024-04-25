<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'apparel',
        'jersey_cut',
        'neck_type',
        'short_type',
        'polo_type',
        'polo_collar',
        'fabric',
        'order_id'
    ];
}

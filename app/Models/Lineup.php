<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lineup extends Model
{
    use HasFactory;

    protected $fillable = [
        'player_name',
        'player_details',
        'classification',
        'gender',
        'upper_size',
        'short_size',
        'short_name',
        'order_id',
        'status',
        'note',
        'lineup_price'
    ];

    public function orders() {
        return $this->belongsTo(Order::class, 'order_id');
    }
}

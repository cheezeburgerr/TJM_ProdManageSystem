<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductionDetails extends Model
{
    use HasFactory;
    protected $table = 'production_details';

    protected $primaryKey = "production_details_id";
    protected $fillable = [
        'order_id',
        'artist_id',
        'printer_id',
        'status',
        'note'
    ];


    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    public function artist(){
        return $this->belongsTo(User::class, 'artist_id');
    }
}

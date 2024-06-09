<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function products()
    {
        return $this->belongsTo(Products::class, 'product_id');
    }

    public function production()
    {
        return $this->hasOne(ProductionDetails::class, 'order_id');
    }

    public function attributes(){
        return $this->belongsToMany(AttributeOptions::class, 'order_attributes_options', 'order_id', 'option_id');
    }

    public function lineups() {
        return $this->hasMany(Lineup::class, 'order_id');
    }

}

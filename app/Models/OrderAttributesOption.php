<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderAttributesOption extends Model
{
    use HasFactory;

    protected $primaryKey = 'attributes_option_id';

    public function orders(){
        return $this->belongsToMany(Order::class, 'order_attributes_options', 'option_id', 'order_id');
    }
}

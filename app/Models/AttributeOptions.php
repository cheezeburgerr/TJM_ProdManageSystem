<?php

namespace App\Models;

use Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributeOptions extends Model
{
    use HasFactory;

    public function attributes() {
        return $this->belongsTo(Attribute::class, 'attributes_id');
    }

    public function order_attributes(){
        return $this->belongsToMany(Order::class, 'order_attributes_options', 'order_id', 'option_id');
    }
}

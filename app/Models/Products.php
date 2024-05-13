<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;



    protected $fillable = [
        'product_name',
        'product_price',
        'product_image'
    ];

    public function orders() {
        return $this->hasMany(Order::class, 'product_id', 'id');
    }

    public function attributes()
    {
        return $this->belongsToMany(Attributes::class, 'product_attributes', 'product_id', 'attributes_id')->withPivot('product_id');
    }

    public function gallery () {
        return $this->hasMany(Gallery::class, 'product_id');
    }
}

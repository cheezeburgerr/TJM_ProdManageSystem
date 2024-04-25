<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductOption extends Model
{
    use HasFactory;

    protected $table = 'products_options';

    public function options() {
        return $this->belongsToMany(Products::class, 'products_options_join')->withPivot('product_option_type');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductOptionsJoin extends Model
{
    use HasFactory;

    protected $table = "products_options_join";

    protected $fillable = [
        'product_id',
        'option_id'
    ];
}

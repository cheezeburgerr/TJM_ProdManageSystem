<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attributes extends Model
{
    use HasFactory;

    public function products()
    {
        return $this->belongsToMany(Products::class, 'product_attributes', 'attributes_id', 'product_id')->withTimestamps();
    }

    public function options()
    {
        return $this->hasMany(AttributeOptions::class, 'attributes_id', 'id');
    }

}

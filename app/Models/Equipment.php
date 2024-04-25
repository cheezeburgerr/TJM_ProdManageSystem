<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'equipment_status'
    ];

    public function orders() {
        return $this->hasMany(ProductionDetails::class, 'printer_id');
    }
}
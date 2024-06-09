<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // User::create([
        //     'name' => 'Erjian Soriano',
        //     'email' => 'iansoriano05@gmail.com',
        //     'address' => 'Urbiz',
        //     'contact_number' => '0927428236',
        //     'password' => Hash::make('password'),
        //     'user_type' => '',
        //     'department_id' => 1
        // ]);

        User::create([
            'name' => 'Mildred Arenas',
            'email' => 'mildres@gmail.com',
            'address' => 'Urbiz',
            'contact_number' => '09254643456',
            'password' => Hash::make('password'),
            'user_type' => 'Customer',

        ]);

    }
}

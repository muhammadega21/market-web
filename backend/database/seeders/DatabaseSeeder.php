<?php

namespace Database\Seeders;

use App\Models\Product;
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
        User::create([
            'name' => 'Muhammad Ega Dermawan',
            'email' => 'dermawane988@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'admin'
        ]);
        User::factory(4)->create();
        Product::factory(30)->create();
    }
}

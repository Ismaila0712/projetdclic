<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder {
    public function run() {
        User::create([
            'name' => 'Admin ShopEase',
            'email' => 'admin@shopease.com',
            'password' => Hash::make('password'),
            'is_admin' => true,
        ]);
        User::create([
            'name' => 'Test User',
            'email' => 'test@shopease.com',
            'password' => Hash::make('password'),
        ]);
        $this->call([CategorySeeder::class, ProductSeeder::class]);
    }
}
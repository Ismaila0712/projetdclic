<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder {
    public function run() {
        $categories = [
            ['name' => 'Électronique', 'description' => 'Gadgets, ordinateurs, smartphones.'],
            ['name' => 'Vêtements', 'description' => 'Mode et vêtements.'],
            ['name' => 'Maison', 'description' => 'Décoration et mobilier.'],
            ['name' => 'Sports', 'description' => 'Équipements de sport.'],
            ['name' => 'Livres', 'description' => 'Romans et livres techniques.'],
        ];
        foreach ($categories as $cat) Category::create($cat);
    }
}
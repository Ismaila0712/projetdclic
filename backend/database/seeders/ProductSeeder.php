<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder {
    public function run() {
        $faker = Faker::create();
        $categoryIds = Category::pluck('id')->toArray();
        for ($i = 0; $i < 30; $i++) {
            Product::create([
                'name' => $faker->words(3, true),
                'description' => $faker->paragraph(2),
                'price' => $faker->randomFloat(2, 10, 500),
                'image_url' => 'https://picsum.photos/seed/'.$faker->uuid.'/400/400',
                'category_id' => $faker->randomElement($categoryIds),
            ]);
        }
    }
}
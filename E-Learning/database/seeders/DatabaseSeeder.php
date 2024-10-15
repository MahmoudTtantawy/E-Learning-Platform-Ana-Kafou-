<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call(RoleSeeder::class);
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => 'admin123',
            'national_id' => '12345678910123',
            'gender' => 'Male',
            'role_id' => '1',
        ]);
        User::factory()->create([
            'name' => 'Teacher',
            'email' => 'teacher@gmail.com',
            'password' => 'teacher123',
            'national_id' => '12345678910124',
            'gender' => 'Male',
            'role_id' => '2',
        ]);
        User::factory()->create([
            'name' => 'Student',
            'email' => 'student@gmail.com',
            'password' => 'student123',
            'national_id' => '12345678910125',
            'gender' => 'Male',
            'role_id' => '3',
        ]);
        User::factory()->create([
            'name' => 'Organizer',
            'email' => 'organizer@gmail.com',
            'password' => 'organizer123',
            'national_id' => '12345678910126',
            'gender' => 'Male',
            'role_id' => '4',
        ]);
    }
}

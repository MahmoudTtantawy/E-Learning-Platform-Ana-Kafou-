<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

    Schema::create('user_answers', function (Blueprint $table) {
        $table->id(); // Primary key
        $table->foreignId('user_id');
        $table->foreignUuid('question_id');
        $table->foreignId('answer_id');
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        $table->foreign('answer_id')->references('id')->on('answers')->onDelete('cascade')->onUpdate('cascade');

        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_answers');
    }
};



<?php


use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;





Route::get('/', function () {
    return Inertia::render('Welcome', [
  
    ]);
})->name('connexion');

Route::get('/connexion', function () {
    return Inertia::render('Connexion', [
  
    ]);
})->name('connexion');

Route::get('/inscription', function () {
    return Inertia::render('Inscription', [
  
    ]);
})->name('connexion');

Route::get('/reset', function () {
    return Inertia::render('ResetPassword', [
  
    ]);
})->name('connexion');





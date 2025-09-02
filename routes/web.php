

<?php


use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\BoutiqueController;
use App\Http\Controllers\loginController;
use App\Http\Controllers\produitController;
use App\Http\Controllers\UserParamController;
use App\Models\visite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use App\Http\Controllers\dashboardController;

use function Pest\Laravel\get;

Route::get('/', function () {
    $visite = new visite();
    $visite->ip = request()->ip();
    $visite->url = request()->url();
    $visite->navigateur = request()->header('User-Agent');
    $visite->user_agent = request()->header('User-Agent');
    $visite->save();

    return Inertia::render('Welcome', []);
})->name('connexion');

Route::get('/buyer/dashboard', function () {
    return Inertia::render('BuyerDashboard', []);
})->name('connexion');
Route::get('/buyer/order', function () {
    return Inertia::render('Commandes', []);
})->name('connexion');
Route::get('/buyer/order/detail', function () {
    return Inertia::render('DetailCommande', []);
})->name('connexion');

Route::get('/product', function () {
    return Inertia::render('ProductPage', []);
})->name('connexion');

Route::get('/detail-product', function () {
    return Inertia::render('Panier', []);
})->name('connexion');


Route::post('/register', [RegisteredUserController::class, 'store']);

Route::get('/connexion', function () {
    return Inertia::render('Connexion', []);
})->name('connexion');

Route::post('/login', [loginController::class, 'login']);

Route::get('/inscription', function () {
    return Inertia::render('Inscription', []);
})->name('connexion');

Route::get('/reset', function () {
    return Inertia::render('ResetPassword', []);
})->name('connexion');
Route::get('/produit', function () {
    return Inertia::render('ProductsPage', []);
})->name('connexion');
Route::get('/layout', function () {
    return Inertia::render('AuthenticatedLayout', []);
})->name('connexion');
Route::get('/seller-register', function () {
    if (Auth::check()) {
        return Inertia::render('SellerRegister', []);
    } else {
        return Inertia::render('Connexion', []);
    }
})->name('connexion');

Route::get('/boutique', [BoutiqueController::class,'boutique'])->name('connexion');

Route::get('/parametre', [UserParamController::class,'parametre']);
Route::put('/parametre/update', [UserParamController::class,'update']);

Route::get('/dashboard-achat', [dashboardController::class, 'getDashboard'])->name('connexion');

Route::post('/seller-register',[BoutiqueController::class, 'store']);

Route::post('/password/reset/step1', [loginController::class, 'resetStep1']);
Route::post('/password/reset/step2', [loginController::class, 'resetStep2']);
Route::post('/password/reset/step3', [loginController::class, 'resetStep3']);
Route::post('/password/reset/resend-otp', [loginController::class, 'resetStep1']);

Route::post('/produit/save',[produitController::class,'store']);
Route::delete('/produit/{id}', [produitController::class, 'remove'])->name('produit.remove');
Route::post('/produit/update/{id}', [produitController::class, 'update'])->name('produit.update');







Route::get('/favoirs', function () {
    return Inertia::render('Favoris', [
  
    ]);
})->name('connexion');


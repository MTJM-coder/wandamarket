

<?php

use App\Http\Controllers\AdminSettingController;
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
use App\Http\Controllers\ManageAdminController;
use App\Http\Controllers\AdminAbonnementController;
use App\Http\Controllers\AdminManageClientController;
use App\Http\Controllers\AdminManageProductController;
use App\Http\Controllers\AdminManageSellerController;
use App\Http\Controllers\AdminOrderController;
use App\Http\Controllers\assistantController;
use App\Http\Controllers\commandeController;
use App\Http\Controllers\favorisController;
use App\Http\Controllers\sellerClientOrderController;
use App\Http\Controllers\StatController;
use App\Http\Controllers\welcomeController;
use App\Http\Controllers\messageController;
use App\Models\Produit;
use PhpParser\Node\Stmt\Return_;

use function Pest\Laravel\get;

Route::get('/', [welcomeController::class,'welcome'])->name('welcome');

Route::middleware(['seller'])->group(function () {
    Route::get('/seller/dashboard', [dashboardController::class, 'getSellerDashboard'])->name('seller.dashboard');
    Route::get('/seller/clients',[sellerClientOrderController::class,'getClients']);
    Route::get('/seller/produits', [BoutiqueController::class, 'sellerProduct']);
    Route::get('/seller/stats', [StatController::class, 'sellerStats']);

    Route::get('/seller/settings', function () {
        return Inertia::render('SellerSettings', []);
    });

    Route::get('/boutique', [BoutiqueController::class, 'boutique'])->name('connexion');
    Route::get('/seller/order', [commandeController::class, 'sellerOrder']);
    Route::post('/update/status/order',[commandeController::class, 'changeStatus']);
    Route::get('/seller/{id}/order', [dashboardController::class, 'detailOrders']);
    Route::get('/seller/{id}/confirm/order', [commandeController::class, 'confirmOrder']);
    Route::get('/seller/{id}/cancel/order', [commandeController::class, 'cancelOrder']);
    Route::get('/seller/{id}/mark/order', [commandeController::class, 'markOrder']);
    Route::post('/seller/add/paymentMethod', [BoutiqueController::class, 'addPaymentMethod']);
    Route::post('/seller/change/payement/method',[BoutiqueController::class, 'changePaymentMethod']);
    Route::delete('/seller/settings/delete/{id}',[BoutiqueController::class, 'deletePaymentAccount']);

    Route::post('/seller/param/save/', [BoutiqueController::class, 'saveSellerPreferencesNotification']);
    Route::post('/seller/param/visibility/update', [BoutiqueController::class, 'updateSellerVisibility']);
    Route::delete('/seller/account/delete',[BoutiqueController::class, 'deleteAccount']);

    Route::post('/seller/add/assist',[assistantController::class,'addAssist']);
    Route::delete('/seller/delete/assistant/{id}',[assistantController::class,'deleteAssist']);
});

Route::middleware(['user'])->group(function () {
    Route::get('/buyer/dashboard', [commandeController::class, 'buyerDashboard']);
    Route::get('/buyer/order', [commandeController::class, 'buyerOrder']);
    Route::get('/buyer/order/detail/{id}', [commandeController::class, 'detailOrder']);

    Route::get('/buyer/order/avis', function () {
        return Inertia::render('AvisOrder', []);
    })->name('connexion');
    Route::post('/pass/order', [commandeController::class, 'passOrder']);
    // notifications et messagerie
    Route::get('/notifications', function () {
        return Inertia::render('Notification');
    })->name('notification');

    Route::get('/messagerie',[messageController::class, 'getMessage'])->name('Messagerie');
    Route::post('/message/send',[messageController::class, 'sendMessage'])->name('sendMsg');
    Route::post('/messages/mark-read', [MessageController::class, 'markAsRead']);
    Route::post('/user/remove/message',[messageController::class,'removeConversation']);
    Route::post('/users/delete/message', [messageController::class, 'deleteMessage']);

    Route::post('/conversation/start',[messageController::class, 'startConversationProduit']);

    Route::get('/chat/vendeur/{id}/produit/{produitId}', function ($id, $produitId) {
        return Inertia::render('Messagerie', ['vendeurId' => $id, 'produitId' => $produitId]);
    })->name('chat');

    Route::get('/buyer/order/{id}/confirmation', [commandeController::class, 'orderConfirmation'])->name('order.confirmation');
    // Route::get('/order/confirmation/{group_order_id}', [commandeController::class, 'panierConfirmation'])
    // ->name('order.confirmation');



    Route::post('/produit/save', [produitController::class, 'store']);
    Route::delete('/produit/{id}', [produitController::class, 'remove'])->name('produit.remove');
    Route::post('/produit/update/{id}', [produitController::class, 'update'])->name('produit.update');
    Route::get('/favoris', [favorisController::class, 'index']);
    Route::delete('/favoris/{id}/remove', [favorisController::class, 'remove'])->name('favoris.remove');
    Route::get('/logout',[RegisteredUserController::class, 'logout']);
    Route::get('/buyer/confirm/{id}/orer',[commandeController::class, 'buyerConfirmOrder']);
    Route::get('/buyer/settings',[UserParamController::class, 'getParam']);
    Route::post('/profile/update',[UserParamController::class, 'updateProfile']);
    Route::put('/profile/password', [UserParamController::class, 'updatePassword'])->name('profile.password');
    Route::delete('/profile/avatar', [UserParamController::class, 'removeAvatar'])->name('profile.avatar.remove');
    Route::post('/buyer/valider/panier', [commandeController::class, 'validerPanier']);
});
Route::get('/favoris/{id}/add', [favorisController::class, 'add']);


Route::get('/product', function () {
    return Inertia::render('ProductPage', []);
})->name('connexion');

Route::get('/detail-product/{id}', [produitController::class, 'DetailProduct']);

Route::get('/panier', function () {
    return Inertia::render('Panier');
});

Route::post('/register', [RegisteredUserController::class, 'store']);

Route::get('/connexion', function () {
    return Inertia::render('Connexion', []);
})->name('connexion');


Route::post('/login', [loginController::class, 'login']);

Route::get('/inscription', function () {
    return Inertia::render('Inscription', []);
})->name('inscription');
Route::get('/inscription/assistant/{token}', [assistantController::class, 'inscriptionAssistant']
)->name('inscription.assistant');
Route::post('/registerAssistant', [assistantController::class, 'storeAssistant']);

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


Route::get('/parametre', [UserParamController::class, 'parametre']);
Route::put('/parametre/update', [UserParamController::class, 'update']);

Route::get('/dashboard-achat', [dashboardController::class, 'getDashboard'])->name('connexion');

Route::post('/seller-register', [BoutiqueController::class, 'store']);

Route::post('/password/reset/step1', [loginController::class, 'resetStep1']);
Route::post('/password/reset/step2', [loginController::class, 'resetStep2']);
Route::post('/password/reset/step3', [loginController::class, 'resetStep3']);
Route::post('/password/reset/resend-otp', [loginController::class, 'resetStep1']);



// admin
Route::middleware(['admin'])->group(function () {

    Route::get('/admin/dashboard', function () {
        return Inertia::render('AdminDashboard', []);
    })->name('connexion');

    Route::get('/admin/sellers', [AdminManageSellerController::class, 'getSeller']);

    Route::get('/admin/clients', [AdminManageClientController::class, 'getClient']);
    Route::get('/admin/block/user/{id}', [AdminManageClientController::class, 'block']);
    Route::get('/admin/disblock/user/{id}', [AdminManageClientController::class, 'disBlock']);
    Route::delete('/admin/remove/user/{id}', [AdminManageClientController::class, 'removeClient']);

    Route::get('/admin/orders', [AdminOrderController::class, 'getOrder']);
    Route::delete('/admin/remove/order/{id}', [AdminOrderController::class, 'removeOrder']);

    Route::get('admin/products', [AdminManageProductController::class, 'getProduct']);
    Route::delete('/admin/remove/product/{id}', [AdminManageProductController::class, 'removeProduct']);

    Route::get('/admin/payments', [AdminAbonnementController::class, 'getAbonnement']);
    Route::get('/admin/settings', [AdminSettingController::class, 'getSetting']);

    Route::get('/admin/admins', [ManageAdminController::class, 'getAdmins']);
    Route::get('/remove/admin/{id}', [ManageAdminController::class, 'removeAdmin']);
    Route::get('/disblock/admin/{id}', [ManageAdminController::class, 'disblockAdmin']);
    Route::post('/add/admin', [ManageAdminController::class, 'addAdmin']);
    Route::post('/admin/update', [AdminSettingController::class, 'updateAdmin']);
    Route::post('/admin/update/secure', [AdminSettingController::class, 'updateSecure']);
    Route::post('/add/forfait', [AdminAbonnementController::class, 'addForfait']);
    Route::post('/admin/updateForfait', [AdminAbonnementController::class, 'updateForfait']);
    Route::delete('admin/removeForfait/{id}', [AdminAbonnementController::class, 'removeForfait']);
});

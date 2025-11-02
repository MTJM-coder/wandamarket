<?php

namespace App\Http\Middleware;

use Auth;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()
                    ? $request->user()->only('id', 'nom','prenom', 'email', 'telephone', 'role','ville','quartier','statut','image','created_at','updated_at')
                    : null,
                // 'isVendeur' => $request->user()?->role === 'vendeur',
                'boutique' => $request->user()?->boutique
                ? $request->user()->boutique->only('id', 'nom', 'slug', 'statut', 'logo')
                : null,
                'isConnected'=>Auth::check()
            ],
            'flash' => [
           'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
        ],

            'status' => fn() => $request->session()->get('status'),


        ];
    }
}

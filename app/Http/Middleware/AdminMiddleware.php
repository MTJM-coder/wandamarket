<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
        return redirect('connexion')->with('error', 'Veuillez vous connecter');
    }

    if (!(Auth::user()->role->value == 'admin' || Auth::user()->role->value == 'super_admin')) {
        return redirect('connexion')->with('error', 'Accès refusé');
    }

        return $next($request);
    }
}

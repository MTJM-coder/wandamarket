<?php

namespace App\Http\Middleware;

use Auth;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SellerMiddleware
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
        if(!Auth::user()->role->value=='vendeur'){
             return redirect('connexion')->with('error', 'vous ne disposez pas de compte vendeur');
        }
        return $next($request);
    }
}

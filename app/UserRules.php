<?php

namespace App;

enum UserRules:string
{
    //
    case CLIENT = "client";
    case VENDEUR = 'vendeur';
    case ADMIN = 'admin';
    case SUPER_ADMIN = 'super_admin';
}

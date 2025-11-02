<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Invitation assistant - WandaMarket</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; background-color:#f9f9f9; padding:20px;">
    <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:8px;">
        <h1>Salut ! </h1>
        <p>
            Vous êtes invité(e) par <strong>{{ $nomVendeur }}</strong> à rejoindre la plateforme 
            <strong>WandaMarket</strong> en tant qu’assistant(e) pour la boutique 
            <strong>{{ $boutique }}</strong>.
        </p>
        <p>
            Cliquez sur le lien ci-dessous pour accepter l’invitation :
        </p>
        <a href="{{ $lien }}" 
           style="display:inline-block; padding:10px 20px; background:#007bff; color:white; text-decoration:none; border-radius:5px;">
           Accepter l’invitation
        </a>
        <p style="margin-top:20px;">
            <small><i>Merci, l’équipe WandaMarket.</i></small>
        </p>
    </div>
</body>
</html>

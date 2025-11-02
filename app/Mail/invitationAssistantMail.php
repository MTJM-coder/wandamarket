<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Inertia\Inertia;

class invitationAssistantMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $nomVendeur;
    public $boutique;
    public $lien;
    public function __construct($nomVendeur,$boutique,$lien)
    {
        //
        $this->nomVendeur=$nomVendeur;
        $this->boutique=$boutique;
        $this->lien=$lien;

    }

    public function build(){
        $this->subject('Invitation assistant')
        ->view('emails.Invitation')
        ->with([
            'nomVendeur'=>$this->nomVendeur,
            'boutique'=>$this->boutique,
            'lien'=>$this->lien,
        ]);
        
                

    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Invitation Assistant boutique',
        );
    }
    /**
  

     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}

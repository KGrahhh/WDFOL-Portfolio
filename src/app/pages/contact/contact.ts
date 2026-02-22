import { Component } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  // Use these to keep track of the form state
  isSending = false;

  public sendEmail(e: Event) {
    e.preventDefault();

    if (this.isSending) return; // Prevent double-clicks

    this.isSending = true;

    // --- REPLACE THESE WITH YOUR ACTUAL IDS FROM THE EMAILJS DASHBOARD ---
    const SERVICE_ID = 'service_rkepmkv'; // Found in 'Email Services'
    const TEMPLATE_ID = 'template_lr3ejj1'; // Found in 'Email Templates'
    const PUBLIC_KEY = 'nL2PgIwyaiJE6gAo_'; // Found in 'Account' or 'Settings'
    // --------------------------------------------------------------------

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target as HTMLFormElement, PUBLIC_KEY)
      .then((result: EmailJSResponseStatus) => {
        console.log('SUCCESS!', result.status, result.text);
        alert('Message sent successfully! I will get back to you soon.');
        (e.target as HTMLFormElement).reset(); // Clears the form fields
      })
      .catch((error) => {
        console.error('FAILED...', error);
        alert('Oops! Something went wrong. Please try again or email me directly.');
      })
      .finally(() => {
        this.isSending = false; // Re-enables the button
      });
  }
}
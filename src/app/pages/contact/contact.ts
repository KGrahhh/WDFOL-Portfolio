import { Component, signal } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  isSending = signal(false);

  public sendEmail(e: Event) {
    e.preventDefault();

    if (this.isSending()) return; 

    const form = e.target as HTMLFormElement;
    this.isSending.set(true);

    const SERVICE_ID = 'service_rkepmkv';
    const TEMPLATE_ID = 'template_lr3ejj1';
    const PUBLIC_KEY = 'nL2PgIwyaiJE6gAo_';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
      .then((result: EmailJSResponseStatus) => {
        console.log('SUCCESS!', result.status, result.text);
        alert('Message sent successfully! I will get back to you soon.');
        form.reset();
      })
      .catch((error: unknown) => {
        const err = error as Partial<EmailJSResponseStatus>;
        console.error('EmailJS FAILED:', err.status, err.text, error);

      
        alert(`Oops! Something went wrong [${err.status ?? 'no status'}: ${err.text ?? 'no message'}]. Please try again or email me directly.`);
      })
      .finally(() => {
        this.isSending.set(false);
      });
  }
}
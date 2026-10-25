import { Component, HostListener, input, output } from '@angular/core';

@Component({
  selector: 'app-cert-lightbox',
  template: `
    <div class="backdrop" (click)="closed.emit()"
         role="dialog" aria-modal="true" [attr.aria-label]="title()">
      <div class="panel" (click)="$event.stopPropagation()">
        <button class="close" (click)="closed.emit()" aria-label="Close">&times;</button>
        <img [src]="src()" [alt]="title()">
        <p class="caption">{{ title() }}</p>
      </div>
    </div>
  `,
  styles: [`
    .backdrop {
      position: fixed;
      inset: 0;
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: rgba(0, 0, 0, 0.8);
      -webkit-backdrop-filter: blur(6px);
      backdrop-filter: blur(6px);
      animation: fade 0.25s ease;
    }

    .panel {
      position: relative;
      max-width: min(900px, 100%);
      max-height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    img {
      max-width: 100%;
      max-height: 80vh;
      border-radius: 12px;
      border: 2px solid var(--accent-color);
      box-shadow: 0 0 30px rgba(var(--accent-rgb), 0.4);
      background: #ffffff;
    }

    .caption {
      margin: 0;
      color: #ffffff;
      font-size: 0.95rem;
      text-align: center;
    }

    .close {
      position: absolute;
      top: -14px;
      right: -14px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid var(--accent-color);
      background: #0a0a0a;
      color: var(--accent-color);
      font-size: 1.4rem;
      line-height: 1;
      cursor: pointer;
      transition: 0.3s ease;
    }

    .close:hover {
      background: var(--accent-color);
      color: #0a0a0a;
      box-shadow: 0 0 15px rgba(var(--accent-rgb), 0.6);
    }

    @keyframes fade {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    @keyframes pop {
      from { opacity: 0; transform: scale(0.9); }
      to   { opacity: 1; transform: scale(1); }
    }
  `]
})
export class CertLightbox {
  src = input.required<string>();
  title = input<string>('');
  closed = output<void>();

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closed.emit();
  }
}
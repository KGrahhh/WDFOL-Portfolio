import { Component, HostListener, input, output, signal } from '@angular/core';

export interface GalleryImage {
  src: string;
  caption?: string;
}

@Component({
  selector: 'app-project-gallery',
  template: `
    <div class="backdrop" (click)="closed.emit()"
         role="dialog" aria-modal="true" [attr.aria-label]="title() + ' screenshots'">
      <div class="panel" (click)="$event.stopPropagation()">

        <button class="close" (click)="closed.emit()" aria-label="Close">&times;</button>

        <p class="heading">{{ title() }}</p>

        <div class="stage">
          @if (images().length > 1) {
            <button class="nav prev" (click)="prev()" aria-label="Previous image">&#8592;</button>
          }

          <img [src]="images()[current()].src"
               [alt]="images()[current()].caption ?? title()">

          @if (images().length > 1) {
            <button class="nav next" (click)="next()" aria-label="Next image">&#8594;</button>
          }
        </div>

        <p class="caption">
          {{ images()[current()].caption }}
          @if (images().length > 1) {
            <span class="counter">{{ current() + 1 }} / {{ images().length }}</span>
          }
        </p>

        @if (images().length > 1) {
          <div class="thumbs">
            @for (img of images(); track $index; let i = $index) {
              <button class="thumb"
                      [class.active]="i === current()"
                      (click)="current.set(i)"
                      [attr.aria-label]="'Show image ' + (i + 1)">
                <img [src]="img.src" alt="">
              </button>
            }
          </div>
        }

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
      background: rgba(0, 0, 0, 0.85);
      -webkit-backdrop-filter: blur(6px);
      backdrop-filter: blur(6px);
      animation: fade 0.25s ease;
    }

    .panel {
      position: relative;
      width: min(960px, 100%);
      max-height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .heading {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: #ffffff;
    }

    .stage {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .stage > img {
      max-width: 100%;
      max-height: 62vh;
      object-fit: contain;
      border-radius: 12px;
      border: 2px solid var(--accent-color);
      box-shadow: 0 0 30px rgba(var(--accent-rgb), 0.4);
      background: #0a0a0a;
    }

    .nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 2px solid var(--accent-color);
      background: rgba(10, 10, 10, 0.75);
      color: var(--accent-color);
      font-size: 1.2rem;
      cursor: pointer;
      transition: 0.3s ease;
    }

    .nav:hover {
      background: var(--accent-color);
      color: #0a0a0a;
      box-shadow: 0 0 15px rgba(var(--accent-rgb), 0.6);
    }

    .prev { left: 12px; }
    .next { right: 12px; }

    .caption {
      min-height: 1.4em;
      margin: 0;
      font-size: 0.95rem;
      text-align: center;
      color: #ffffff;
    }

    .counter {
      margin-left: 10px;
      font-weight: 600;
      color: var(--accent-color);
    }

    .thumbs {
      display: flex;
      gap: 10px;
      max-width: 100%;
      padding: 4px;
      overflow-x: auto;
    }

    .thumb {
      flex: 0 0 auto;
      width: 84px;
      height: 56px;
      padding: 0;
      overflow: hidden;
      border-radius: 8px;
      border: 2px solid rgba(255, 255, 255, 0.2);
      background: #0a0a0a;
      opacity: 0.6;
      cursor: pointer;
      transition: 0.3s ease;
    }

    .thumb img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .thumb:hover {
      opacity: 1;
    }

    .thumb.active {
      opacity: 1;
      border-color: var(--accent-color);
      box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.5);
    }

    .close {
      position: absolute;
      top: -14px;
      right: -14px;
      z-index: 1;
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
      from { opacity: 0; transform: scale(0.92); }
      to   { opacity: 1; transform: scale(1); }
    }

    @media (max-width: 480px) {
      .thumb { width: 64px; height: 44px; }
      .nav   { width: 38px; height: 38px; }
    }
  `]
})
export class ProjectGallery {
  images = input.required<GalleryImage[]>();
  title = input<string>('');
  closed = output<void>();

  current = signal(0);

  next() {
    this.current.update(i => (i + 1) % this.images().length);
  }

  prev() {
    this.current.update(i => (i - 1 + this.images().length) % this.images().length);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closed.emit();
  }

  @HostListener('document:keydown.arrowright')
  onRight() {
    this.next();
  }

  @HostListener('document:keydown.arrowleft')
  onLeft() {
    this.prev();
  }
}
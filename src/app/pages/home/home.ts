import { Component, AfterViewInit, ElementRef, OnDestroy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CERTIFICATIONS } from '../../data/certifications';

interface FeaturedProject {
  name: string;
  summary: string;
  image: string;
  alt: string;
  tags: string[];
  link?: string;   // no link = goes to the Projects page instead
  logo?: boolean;  // true = show the image whole on white
}

interface FeaturedCert {
  title: string;
  issuer: string;
  year: string;
  link?: string;   // optional credential URL
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit, OnDestroy {

  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private intervalId: any;
  private resizeHandler?: () => void;
  private revealObserver?: IntersectionObserver;
  private rafId = 0;
  private statsStarted = false;

  // ---------- HERO ----------
  availability = 'Open to internships & freelance'; // edit or remove in home.html

  // ---------- STATS (update the numbers as you grow) ----------
  stats = [
    { label: 'Projects Built',  target: 8,                       suffix: '' },
    { label: 'Certifications',  target: CERTIFICATIONS.length,   suffix: '' },
    { label: 'Client Projects', target: 2,                       suffix: '' },
  ];

  statValues = signal<number[]>(this.stats.map(() => 0));

  // ---------- FEATURED PROJECTS ----------
  featured: FeaturedProject[] = [
    {
      name: 'Life Saver',
      summary: 'A healthcare platform for accessible, reliable care services.',
      image: '/LScare.png',
      alt: 'Life Saver healthcare website',
      tags: ['React', 'Tailwind', 'Node'],
      link: 'https://www.lscarecircle.com.ph/'
    },
    {
      name: 'Filsafe',
      summary: 'A security solutions platform for vault systems and CCTV.',
      image: '/Filsafe.png',
      alt: 'Filsafe security solutions website',
      tags: ['Angular', 'Node'],
      link: 'https://filsafe.shop/'
    },
    {
      name: 'Document Tracker System',
      summary: 'A document tracking log for the MISD office at CIAC.',
      image: '/ciac-logo.png',
      alt: 'Clark International Airport Corporation logo',
      tags: ['React', 'Vite', 'Supabase'],
      logo: true
    }
  ];

  // ---------- FEATURED CERTIFICATIONS (replace with your real ones) ----------
  featuredCerts: FeaturedCert[] = [
    { title: 'Your Certification Title', issuer: 'Issuer name', year: '2025', link: 'https://...' },
    { title: 'Your Certification Title', issuer: 'Issuer name', year: '2025' },
    { title: 'Your Certification Title', issuer: 'Issuer name', year: '2024' }
  ];

  // ---------- LIFECYCLE ----------
  ngAfterViewInit() {
    this.initMatrix();
    this.initReveal();
  }

  ngOnDestroy() {
    // This stops the animations when you leave the page
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    this.revealObserver?.disconnect();
    cancelAnimationFrame(this.rafId);
  }

  // ---------- HERO: CURSOR SPOTLIGHT ----------
  onHeroMove(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - r.left}px`);
    el.style.setProperty('--my', `${event.clientY - r.top}px`);
  }

  // ---------- PROJECT CARD TILT ----------
  onTilt(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width - 0.5;
    const y = (event.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`);
  }

  resetTilt(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }

  // ---------- SCROLL REVEAL + COUNTERS ----------
  private initReveal() {
    const els = Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>('.reveal'));

    if (typeof IntersectionObserver === 'undefined') {
      els.forEach(el => el.classList.add('in-view'));
      this.animateStats();
      return;
    }

    this.revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('in-view');
        if (el.hasAttribute('data-stats')) this.animateStats();
        this.revealObserver?.unobserve(el);
      }
    }, { threshold: 0.15 });

    els.forEach(el => this.revealObserver!.observe(el));
  }

  private animateStats() {
    if (this.statsStarted) return;
    this.statsStarted = true;

    const duration = 1400;
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      this.statValues.set(this.stats.map(s => Math.round(s.target * eased)));
      if (t < 1) this.rafId = requestAnimationFrame(step);
    };

    this.rafId = requestAnimationFrame(step);
  }

  // ---------- YOUR ORIGINAL MATRIX CODE (kept as is) ----------
  initMatrix() {
    const canvas = document.getElementById('matrixCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*()ΣΩΠ";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    this.intervalId = setInterval(draw, 35);

    this.resizeHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', this.resizeHandler);
  }
}
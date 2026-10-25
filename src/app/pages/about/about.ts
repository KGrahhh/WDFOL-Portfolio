import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CERTIFICATIONS, Certification } from '../../data/certifications';
import { CertLightbox } from '../../components/cert-lightbox/cert-lightbox';

@Component({
  selector: 'app-about',
  imports: [RouterLink, CertLightbox],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

  // ---------- ABOUT SLIDER ----------
  slides = [
    {
      label: 'Who I Am',
      paragraphs: [
        'My name is Khristian Carl J. Pradilla a web development student who resides in Angeles City Pampanga.',
        'My career in technology development operates through two main forces which express my artistic skills and my logical reasoning abilities.'
      ]
    },
    {
      label: 'How I Design',
      paragraphs: [
        'My front-end development work focuses on creating clean designs which maintain responsive capabilities while delivering visually appealing user interfaces.',
        'I design websites with neon colors and minimalist design elements because I want to create user experiences which users find easy to navigate.'
      ]
    },
    {
      label: 'Beyond the Code',
      paragraphs: [
        'My free time gets divided between coding and playing video games.',
        'Gaming has improved my ability to think strategically while solving difficult problems under pressure which I apply in my development work.'
      ]
    }
  ];

  current = signal(0);

  next() {
    this.current.update(i => (i + 1) % this.slides.length);
  }

  prev() {
    this.current.update(i => (i - 1 + this.slides.length) % this.slides.length);
  }

  goTo(index: number) {
    this.current.set(index);
  }

  // ---------- TECH SKILLS ----------
  techs = [
    { name: 'HTML',       icon: 'devicon-html5-plain colored' },
    { name: 'CSS',        icon: 'devicon-css3-plain colored' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
    { name: 'Angular',    icon: 'devicon-angular-plain colored' },
    { name: 'Node.js',    icon: 'devicon-nodejs-plain colored' },
    { name: 'MongoDB',    icon: 'devicon-mongodb-plain colored' },
    { name: 'PHP',        icon: 'devicon-php-plain colored' },
    { name: 'Python',     icon: 'devicon-python-plain colored' },
    { name: 'GitHub',     icon: 'devicon-github-original' },
    { name: 'Figma',      icon: 'devicon-figma-plain colored' }
  ];

  // ---------- SOFT SKILLS ----------
  softSkills = [
    { name: 'Problem Solving',     icon: 'bulb' },
    { name: 'Communication',       icon: 'chat' },
    { name: 'Adaptability',        icon: 'adapt' },
    { name: 'Creative Thinking',   icon: 'palette' },
    { name: 'Attention to Detail', icon: 'search' },
    { name: 'Teamwork',            icon: 'users' },
    { name: 'Time Management',     icon: 'clock' },
    { name: 'Critical Thinking',   icon: 'branch' },
    { name: 'Quick Learner',       icon: 'book' },
    { name: 'Reliability',         icon: 'shield' }
  ];

  // ---------- CERTIFICATIONS ----------
  featuredCerts = CERTIFICATIONS.filter(c => c.featured);

  selectedCert = signal<Certification | null>(null);

  onCertClick(event: Event, cert: Certification) {
    if (cert.image) {
      event.preventDefault();
      this.selectedCert.set(cert);
    }
  }

  closeCert() {
    this.selectedCert.set(null);
  }

}
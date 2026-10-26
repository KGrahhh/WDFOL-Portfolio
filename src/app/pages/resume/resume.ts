import { Component, signal } from '@angular/core';
import { CERTIFICATIONS, Certification } from '../../data/certifications';
import { CertLightbox } from '../../components/cert-lightbox/cert-lightbox';

interface EducationItem {
  years: string;
  school: string;
  program: string;
}

interface ProjectItem {
  name: string;
  type: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-resume',
  imports: [CertLightbox],
  templateUrl: './resume.html',
  styleUrl: './resume.css',
})
export class Resume {

  // ---------- EDUCATION (newest first) ----------
  education: EducationItem[] = [
    {
      years: '2023 – Present',
      school: 'Holy Angel University',
      program: 'Bachelor of Science in Information Technology, Specialization in Web Development'
    },
    {
      years: '2017 – 2023',
      school: 'Don Bosco Mabalacat',
      program: 'ABM'
    }
  ];

  // ---------- SKILLS + LANGUAGES ----------
  skills = [
    'JavaScript', 'HTML / CSS', 'Angular', 'Node.js', 'MongoDB',
    'PHP', 'Python', 'Figma', 'GitHub'
  ];

  languages = ['English', 'Filipino'];

  // ---------- PROJECTS ----------
  projects: ProjectItem[] = [
    {
      name: 'DOMORE',
      type: 'Student Planner',
      description: 'Full-stack web planner integrating task and file management. Built as a core team member of the project.',
      tags: ['Node.js', 'Express', 'MongoDB']
    },
    {
      name: 'TOP FRAG',
      type: 'Fragrance Store Website',
      description: 'A web-based fragrance storefront showcasing curated perfume collections, with a responsive layout.',
      tags: ['HTML', 'CSS', 'JavaScript']
    },
    {
      name: 'FILSAFE',
      type: 'Security Client Website',
      description: 'Professional security platform showcasing high-end protective hardware, built as a full-stack experience.',
      tags: ['Angular', 'Node.js']
    },
    {
      name: 'LIFE SAVER',
      type: 'Healthcare Client Website',
      description: 'Client website for a healthcare service provider, with a hero section, an interactive services section, and responsive About and Contact pages.',
      tags: ['React','AWS','Node.js','PostGreSQL','Motion']
    },
    {
      name: 'DOCUMENT TRACKER',
      type: 'System for Tracking Documents',
      description: 'Document tracking log for the MISD office at CIAC, with document types and statuses, remarks, Excel export, and import of legacy CSV records.',
      tags: ['React', 'Node.js', 'MySQL']
    },
    {
      name: 'RISK MANAGEMENT',
      type: 'System for Managing Risks',
      description: 'System for managing risks at Clark International Airport Corporation (CIAC).',
      tags: ['React','Node.js','MySQL']
    }
  ];

  // ---------- CERTIFICATIONS ----------
  certs = CERTIFICATIONS;

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
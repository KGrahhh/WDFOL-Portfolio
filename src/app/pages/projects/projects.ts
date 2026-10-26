import { Component, computed, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { GalleryImage, ProjectGallery } from '../../components/project-gallery/project-gallery';

type Category = 'figma' | 'ojt' | 'client' | 'school';
type FilterId = 'all' | Category;

interface Project {
  name: string;
  description: string;
  image?: string;
  alt?: string;
  logo?: boolean;           
  role?: string;
  contribution?: string;
  tags: string[];
  link?: string;
  gallery?: GalleryImage[];  
  categories: Category[];
}

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all',    label: 'All' },
  { id: 'figma',  label: 'Figma Designs' },
  { id: 'ojt',    label: 'OJT' },
  { id: 'client', label: 'Client' },
  { id: 'school', label: 'School' }
];

@Component({
  selector: 'app-projects',
  imports: [ProjectGallery],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {

  private title = inject(Title);
  private meta = inject(Meta);

  // ---------- PROJECTS ----------
  projects: Project[] = [
    {
      name: 'Topfrag',
      description: 'An elegant e-commerce perfume store built with HTML and CSS, featuring a minimalist aesthetic designed to match user personalities.',
      image: '/topfrag.png',
      alt: 'Topfrag perfume ecommerce website project',
      role: 'Project Manager | Frontend | UI/UX',
      contribution: 'Led the overall look and functionality of the website, ensuring a seamless user experience.',
      tags: ['HTML', 'CSS'],
      link: 'https://topfragshop.netlify.app/',
      categories: ['school']
    },
    {
      name: 'DoMore',
      description: 'A high-performance student task planner and Pomodoro timer built with Vite and Node for disciplined productivity.',
      image: '/DomoreLogin.png',
      alt: 'DoMore productivity planner and pomodoro timer application',
      role: 'Data and Frontend',
      contribution: 'Managed data handling and implemented frontend features for smooth user interaction.',
      tags: ['Vite', 'Node'],
      link: 'https://domore-student-planner.netlify.app/',
      categories: ['school']
    },
    {
      name: 'Filsafe',
      description: 'A professional security solutions platform showcasing high-end vault systems, CCTV technologies, and advanced intrusion protection.',
      image: '/Filsafe.png',
      alt: 'FilSafe security solutions website with CCTV and vault systems',
      role: 'Frontend | UI/UX',
      contribution: 'Led the overall look and feel of the platform, ensuring an intuitive and polished interface.',
      tags: ['Angular', 'Node'],
      link: 'https://filsafe.shop/',
      categories: ['client']
    },
    {
      name: "Popong's Anayadi Samgyup",
      description: 'A vibrant Korean BBQ reservation platform featuring a calendar-based booking system and a modern orange-themed interface.',
      image: '/Samgy.png',
      alt: "Popong's Samgyup Korean BBQ reservation platform",
      role: 'Frontend',
      contribution: 'Developed frontend components and ensured smooth interactions across the platform.',
      tags: ['Figma'],
      link: 'https://www.figma.com/design/MOWQoEtukkscBANqUQuDnX/Untitled?node-id=0-1&t=mYRIyCKuwNE8X4Ca-1',
      categories: ['figma']
    },
    {
      name: 'ScrubHub',
      description: 'A sleek car wash platform with neon-on-black design featuring service menus, appointment scheduling, and admin directories.',
      image: '/scrubhub.png',
      alt: 'Scrub Hub car wash service platform with appointment scheduling',
      role: 'Frontend | UI/UX',
      contribution: 'Led the overall design and user interface of the platform for a modern aesthetic.',
      tags: ['Figma'],
      link: 'https://www.figma.com/design/bmmd3Jhb3AfemlanhU2iDI/Untitled?node-id=0-1&t=etRA9gKeRTJ19dKn-1',
      categories: ['figma']
    },
    {
      name: 'Life Saver',
      description: 'A healthcare-related platform focused on providing accessible and reliable care services through digital solutions, helping improve coordination and efficiency in healthcare operations.',
      image: '/LScare.png',
      alt: 'Life Saver',
      role: 'Frontend | UI/UX',
      contribution: 'Led the overall design and user interface of the platform.',
      tags: ['React','AWS','Node.js','PostGreSQL','Motion'],
      link: 'https://www.lscarecircle.com.ph/',
      categories: ['client']
    },
    {
      name: 'Document Tracker System',
      description: 'A document tracking log built for the MISD office at CIAC, with document types and statuses, remarks, Excel export, and import of legacy CSV records.',
      image: '/ciac-logo.png',
      alt: 'Clark International Airport Corporation (CIAC) logo',
      role: 'Frontend | UI/UX',
      contribution: 'Led the overall design and user interface of the system.',
      logo: true,
      tags: ['Angular', 'Node.js', 'Supabase'],
      gallery: [
        { src: '/ojt/DocTrackDashboard.png', caption: 'Document log overview' },
        { src: '/ojt/DocTrackAddingDocs.png', caption: 'Adding and editing a document' }
      ],
      categories: ['ojt']
    },
    {
      name: 'Risk Management System',
      description: 'A system for managing and monitoring risks at Clark International Airport Corporation (CIAC), built during my on-the-job training.',
      image: '/ciac-logo.png',
      alt: 'Clark International Airport Corporation (CIAC) logo',
      role: 'Support Engineer | Software Tester',
      contribution: 'Troubleshot and resolved system issues while testing features, reporting bugs, and verifying fixes to keep the application reliable and user-friendly.',
      logo: true,
      tags: ['React','Node.js','MySQL'],
      gallery: [
        { src: '/ojt/rmsSignup.png', caption: 'Sign In' },
        { src: '/ojt/rmsDashboard.png', caption: 'Risk Dashboard' },
        { src: '/ojt/rmsRiskManagement.png', caption: 'Risk Register Page' }
      ],
      categories: ['ojt']
    }
  ];

  // ---------- FILTERS ----------
  filters = FILTERS.map(f => ({ ...f, count: this.count(f.id) }));

  activeFilter = signal<FilterId>('all');

  filteredProjects = computed(() => {
    const f = this.activeFilter();
    return f === 'all'
      ? this.projects
      : this.projects.filter(p => p.categories.includes(f));
  });

  setFilter(id: FilterId) {
    this.activeFilter.set(id);
  }

  private count(id: FilterId): number {
    if (id === 'all') return this.projects.length;
    return this.projects.filter(p => p.categories.includes(id)).length;
  }

  // ---------- SCREENSHOT GALLERY ----------
  activeGallery = signal<{ title: string; images: GalleryImage[] } | null>(null);

  openGallery(project: Project) {
    if (project.gallery?.length) {
      this.activeGallery.set({ title: project.name, images: project.gallery });
    }
  }

  closeGallery() {
    this.activeGallery.set(null);
  }

  // ---------- PAGE TITLE + SEO TAGS ----------
  constructor() {
    this.title.setTitle('Khristian Pradilla | Web Development Projects Portfolio');

    this.meta.updateTag({ name: 'description', content: 'Explore the web development projects of Khristian Pradilla including e-commerce platforms, productivity apps, reservation systems, and security solutions.' });
    this.meta.updateTag({ name: 'keywords', content: 'Khristian Pradilla, web developer portfolio, HTML CSS projects, Vite Node apps, reservation system, ecommerce website, productivity planner' });
    this.meta.updateTag({ name: 'author', content: 'Khristian Pradilla' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({ property: 'og:title', content: 'Khristian Pradilla | Web Development Projects' });
    this.meta.updateTag({ property: 'og:description', content: 'A showcase of modern web platforms and applications including productivity tools, reservation systems, and e-commerce websites.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: 'https://khristianpradilla.vercel.app/projects' });
    this.meta.updateTag({ property: 'og:image', content: 'https://khristianpradilla.vercel.app/portfolio-preview.png' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Khristian Pradilla Portfolio' });
  }

}
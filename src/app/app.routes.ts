import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Projects } from './pages/projects/projects';
import { Resume } from './pages/resume/resume';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
    { 
      path: '', 
      component: Home, 
      data: { 
        title: 'Home | Khristian Pradilla', 
        description: 'Portfolio of Khristian Pradilla, a Web Developer and UI/UX Designer specializing in clean, neon-aesthetic digital experiences.' 
      }
    },   
    { 
      path: 'about', 
      component: About, 
      data: { 
        title: 'About Me | Khristian Pradilla', 
        description: 'Learn more about Khristian Pradilla’s background in IT, design philosophy, and technical expertise in Angular and Node.js.' 
      }
    },
    { 
      path: 'projects', 
      component: Projects, 
      data: { 
        title: 'Projects | Showcase', 
        description: 'Explore a gallery of web applications and design projects, including FilSafe, DoMore, and Scrub Hub.' 
      }
    },
    { 
      path: 'resume', 
      component: Resume, 
      data: { 
        title: 'Resume | Experience & Skills', 
        description: 'View the professional experience, certifications, and technical skills of Khristian Pradilla.' 
      }
    },
    { 
      path: 'contact', 
      component: Contact, 
      data: { 
        title: 'Contact | Hire Me', 
        description: 'Get in touch with Khristian Pradilla for web development collaborations and UI/UX design inquiries.' 
      }
    },
];
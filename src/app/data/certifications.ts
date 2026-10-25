export interface Certification {
    title: string;
    org: string;
    date: string;
    url?: string;       
    image?: string;
    featured?: boolean; 
  }
  
  export const CERTIFICATIONS: Certification[] = [
    {
        title: 'On-the-Job Training Completion',
        org: 'Clark International Airport Corporation',
        date: 'October 13, 2026', 
        image: '/ojtcert.png',
        featured: true
      },
    {
      title: 'Legacy JavaScript Algorithms and Data Structure V7',
      org: 'Free Code Camp',
      date: 'July 17, 2025',
      image: '/legacyJavaCert.jpg'
    },
    {
      title: 'Legacy Responsive Web Design V8',
      org: 'Free Code Camp',
      date: 'August 27, 2024',
      image: '/LegacyCertV8.jpg',
    },
    {
      title: 'Back End Development and APIs V8',
      org: 'Free Code Camp',
      date: 'October 3, 2025',
      image: '/BackendCert.jpg',
    },
    {
      title: 'Digital Advertising',
      org: 'HubSpot Academy',
      date: 'October 22, 2025',
      image: '/DigitalCert.png',
      featured: true,
    },
    {
      title: 'SEO',
      org: 'HubSpot Academy',
      date: 'January 10, 2026',
      image: '/SEOCert.png',
      featured: true
    },
    {
      title: 'SEO II',
      org: 'HubSpot Academy',
      date: 'February 6, 2026',
      image: '/SEOIICert.png',
    },
    {
        title: 'Programming Fundamentals',
        org: 'SimpliLearn',
        date: 'October 15, 2026',
        image: '/ProgFunda.png',
        featured: true
      },

      {
        title: 'IT Customer Support Basics',
        org: 'Cisco Networking Academy Program',
        date: 'October 15, 2026',
        image: '/ITCustomerCert.png',
        featured: true
      },
      {
        title: 'Manage GA4 Data and Learn to Read Reports.',
        org: 'Google Skillshop',
        date: 'March 12, 2026',
        image: '/ManageGA4Cert.png',
      },
      {
        title: 'Dive Deeper into GA4 Data and Reports',
        org: 'Google Skillshop',
        date: 'March 11, 2026',
        image: '/DiveDeeperCert.png',
      },
      {
        title: 'Get started using Google Analytics',
        org: 'Google Skillshop',
        date: 'March 12, 2026',
        image: '/GetStartedCert.png',
      }
  ];
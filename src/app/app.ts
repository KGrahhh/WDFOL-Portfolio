import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser'; // Import SEO services
import { filter, map } from 'rxjs/operators';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar, Footer], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('portfolio-project');
  protected readonly showIntro = signal(true);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    // 1. Existing Intro Timeout Logic
    setTimeout(() => {
      this.showIntro.set(false);
    }, 800);

    // 2. SEO Subscription Logic
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        return child?.snapshot.data;
      })
    ).subscribe((data: any) => {
      if (data) {
        // Update the tab title
        this.titleService.setTitle(data.title || 'Khristian Pradilla | Portfolio');
        
        // Update the meta description
        this.metaService.updateTag({ 
          name: 'description', 
          content: data.description || 'Web Developer and UI/UX Designer Portfolio' 
        });
      }
    });
  }
}
import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for [class] bindings
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  // Added CommonModule here
  imports: [CommonModule, RouterOutlet, Navbar, Footer], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('portfolio-project');
  
  // Use a signal for the intro state
  protected readonly showIntro = signal(true);

  ngOnInit() {
    // Hide the intro after 2 seconds
    setTimeout(() => {
      this.showIntro.set(false);
    }, 2000);
  }
}
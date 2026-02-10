import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']  // <-- fix typo here
})
export class Navbar implements OnInit {
  // Tracks system theme
  isLightTheme: boolean = false;

  ngOnInit(): void {
    // Detect system light/dark mode
    if (window.matchMedia) {
      this.isLightTheme = window.matchMedia('(prefers-color-scheme: light)').matches;

      // Optional: listen for changes in system theme
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
        this.isLightTheme = e.matches;
      });
    }
  }
}

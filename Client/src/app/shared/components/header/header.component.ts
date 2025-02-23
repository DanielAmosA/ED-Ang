import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { fadeInOutAnimation } from '../../animations/animations';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [fadeInOutAnimation],
})

// Responsible for header
export class HeaderComponent implements OnInit {

  // Used to store and send data about whether it is a mobile device
  // (in the sense of screen width).
  isMobileSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  isMenuOpen = false;

  // Information about the device platform.
  // It is used to determine whether we are working in a browser
  // (thus allowing us to check whether we are working in a browser environment or not).
  constructor(
    // Direct injections
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileSubject.next(window.innerWidth < 768);
      window.addEventListener('resize', this.onResize.bind(this));
    }
  }

  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileSubject.next(window.innerWidth < 768);
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  menuItems = [
    { path: [''], label: 'Home', icon: 'home' },
    { path: ['customerMain'], label: 'New customer', icon: 'add_circle' },
  ];
}

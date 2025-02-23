import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { fadeInOutAnimation } from '../../animations/animations';

@Component({
  selector: 'app-footer',
  standalone:true,
  imports: [MatIconModule,RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  animations: [fadeInOutAnimation]
})

// Responsible for footer
export class FooterComponent {
  currentYear = new Date().getFullYear();
}

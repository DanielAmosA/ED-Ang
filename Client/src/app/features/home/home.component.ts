import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { CustomerTableComponent } from '../customer-table/customer-table.component';
import { CustomerMainFormComponent } from '../customer-main-form/customer-main-form.component';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import {
  fadeInAnimation,
  sentenceAnimation,
} from '../../shared/animations/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CustomerTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [sentenceAnimation, fadeInAnimation],
})

// Responsible for home
export class HomeComponent {

  constructor(
    // Direct injections
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(NgZone) private ngZone: NgZone
  ) {}

  private homeSentences: string[] = [
    'Building Relationships, Growing Success',
    'Every Customer Has a Story, We Help Write It',
    'Transform Data into Lasting Connections',
    'Your Success is Our Priority',
    'Innovate, Collaborate, Elevate',
    'Where Customer Service Meets Excellence',
    'Together We Build Better Business',
    'Turning Opportunities into Reality',
    'Empowering Your Business Journey',
    'Creating Value Through Partnership',
  ];

  currentSentence: string = this.homeSentences[0];
  animationSentenceSt: number = 0;

  // Using BehaviorSubject to manage the state of the current sentence
  currentSentenceSubject = new BehaviorSubject<string>(this.currentSentence);
  // Observable of the current sentence
  currentSentence$ = this.currentSentenceSubject.asObservable();

  sentenceSubscription?: Subscription;

  // loading status
  isLoading: boolean = false;

  ngOnInit() {
    // Using SSR (Server Side Rendering),
    // Adding a check that we are on the client side:
    if (isPlatformBrowser(this.platformId)) {
      // Start loading
      this.isLoading = true;

      this.sentenceSubscription = interval(5000).subscribe(() => {
        this.ngZone.run(() => {
          // Ensuring the change happens within Angular's zone
          this.onChangeSentence();
          this.currentSentenceSubject.next(this.currentSentence);
          this.isLoading = false;
        });
      });
    }
  }

  ngOnDestroy() {
    if (this.sentenceSubscription) {
      this.sentenceSubscription.unsubscribe();
      // Closing the BehaviorSubject
      this.currentSentenceSubject.complete();
    }
  }

  // Get random sentence
  private onChangeSentence() {
    const currentIndex = this.homeSentences.indexOf(this.currentSentence);
    const nextIndex = (currentIndex + 1) % this.homeSentences.length;
    this.currentSentence = this.homeSentences[nextIndex];
    this.animationSentenceSt++; // Trigger animation
  }
}

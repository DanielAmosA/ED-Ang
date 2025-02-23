import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  bounceInAnimation,
  fadeInOutAnimation,
  floatAnimation,
  rotateAnimation,
  shakeAnimation,
} from '../../shared/animations/animations';
import { BehaviorSubject, interval, map, Subscription, takeWhile } from 'rxjs';
import { TFloatMode, TRotateMode } from '../../core/types/animation.type';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    AsyncPipe,RouterModule
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
  animations: [
    fadeInOutAnimation,
    bounceInAnimation,
    floatAnimation,
    rotateAnimation,
  ],
})

// Responsible for page not found
export class PageNotFoundComponent {
  alive = true;
  floatState$ = new BehaviorSubject<TFloatMode>('start');
  numberState$ = new BehaviorSubject<TRotateMode>('normal');
  subs: Subscription[] = [];

  constructor(
    // Direct injections
    @Inject(MatSnackBar) private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.initializeAnimations();
  }

  ngOnDestroy(): void {
    this.alive = false;
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  private initializeAnimations(): void {
    // Using SSR (Server Side Rendering),
    // Adding a check that we are on the client side:
    if (isPlatformBrowser(this.platformId)) {
      // Float animation
      this.subs.push(
        interval(2000)
          .pipe(
            takeWhile(() => this.alive),
            map(() => (this.floatState$.value === 'start' ? 'end' : 'start'))
          )
          .subscribe((state) => this.floatState$.next(state))
      );

      // Number rotation
      this.subs.push(
        interval(5000)
          .pipe(
            takeWhile(() => this.alive),
            map(() =>
              this.numberState$.value === 'normal' ? 'rotated' : 'normal'
            )
          )
          .subscribe((state) => this.numberState$.next(state))
      );
    }
  }

  showEasterEgg(): void {
    this.snackBar.open(
      'Our clients seem to be lost in a different dimension! 🌌',
      'Got it',
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      }
    );
  }
}

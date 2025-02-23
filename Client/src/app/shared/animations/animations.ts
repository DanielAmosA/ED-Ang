import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

// Animation settings , designed to liven up the interface and make its use more dynamic and interesting.


// Animation for pop in
export const fadeInOutAnimation = trigger('fadeInOut', [
  state(
    'void',
    style({
      opacity: 0,
      transform: 'translateY(20px)',
    })
  ),
  transition('void => *', [animate('0.4s ease-out')]),
]);


// Animation for open dialog
export const dialogOpen = trigger('dialogOpen', [
  state('void', style({ opacity: 0, transform: 'scale(0.8)' })),
  state('*', style({ opacity: 1, transform: 'scale(1)' })),
  transition('void <=> *', animate('500ms ease-in-out')),
]);


// Animation for success status
export const successOpen = trigger('successOpen', [
  state('void', style({ opacity: 0, transform: 'scale(0.8)' })),
  state('*', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
  transition('void <=> *', animate('500ms 0.3s ease-in-out')),
]);


// Animation for warning mode
export const warningOpen = trigger('warningOpen', [
  state('void', style({ opacity: 0, transform: 'scale(0.8) rotate(10deg)' })),
  state('*', style({ opacity: 1, transform: 'scale(1) rotate(0deg)' })),
  transition('void <=> *', animate('600ms ease-in-out')),
]);


// Animation for error condition
export const errorOpen = trigger('errorOpen', [
  state('void', style({ opacity: 0, transform: 'scale(0.8)' })),
  state('*', style({ opacity: 1, transform: 'scale(1)' })),
  transition('void <=> *', animate('500ms ease-out')),
]);


// Button animation
export const buttonAnimation = trigger('buttonAnimation', [
  state('void', style({ transform: 'translateY(10px)', opacity: 0 })),
  state('*', style({ transform: 'translateY(0)', opacity: 1 })),
  transition('void <=> *', animate('300ms 0.3s ease-in-out')),
]);


// list animation
export const listAnimation = trigger('listAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-20px)' }),
    animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);


// table animation
export const tableAnimation = trigger('tableAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-15px)' }),
    animate('0.4s ease-out',
      style({ opacity: 1, transform: 'translateY(0)' })
    )
  ])
]);


// row animation
export const rowAnimation = trigger('rowAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-10px)' }),
    animate('0.3s ease-out',
      style({ opacity: 1, transform: 'translateX(0)' })
    )
  ])
]);


// Animation for submit button
export const submitAnimation = trigger('submitAnimation', [
  state('default', style({
    transform: 'scale(1)',
  })),
  transition('* => *', [
    animate('0.5s ease-in-out', style({
      transform: 'scale(1.05)',
    }))
  ]),
]);


// Animation for adding an address or contact
export const fadeInAnimation = trigger('fadeInAnimation', [
  state('default', style({
    opacity: 1,
  })),
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.5s ease-in-out', style({ opacity: 1 }))
  ])
]);


// Animation for changing the color of an input field
export const inputFocusAnimation = trigger('inputFocusAnimation', [
  state('focused', style({
    borderColor: '#5ecee1',
    boxShadow: '0 0 5px rgba(94, 206, 225, 0.7)',
  })),
  transition(':enter', [
    style({
      borderColor: '#103c75',
      boxShadow: 'none',
    }),
    animate('0.3s ease-in-out'),
  ]),
]);


// Animation for the appearance and disappearance of error messages
export const errorMessageAnimation = trigger('errorMessageAnimation', [
  state('default', style({
    opacity: 0,
  })),
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.3s ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('0.3s ease-out', style({ opacity: 0 })),
  ]),
]);


// Animation for the web buttons
export const webButtonAnimation = trigger('buttonState', [
  state('normal', style({
    transform: 'translateY(0)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  })),
  state('hover', style({
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
  })),
  transition('normal => hover', animate('200ms ease-out')),
  transition('hover => normal', animate('200ms ease-in'))
]);


// Animation for the pop sentence
export const sentenceAnimation = trigger('sentenceAnimation', [
  transition('* => *', [
    style({ opacity: 0, transform: 'translateY(10px)' }),
    animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
])

// Animation for the bounce effect
export const bounceInAnimation = trigger('bounceIn', [
  transition(':enter', [
    animate('1s ease-out', keyframes([
      style({
        transform: 'scale(0) rotate(0deg)',
        opacity: 0,
        offset: 0
      }),
      style({
        transform: 'scale(1.2) rotate(10deg)',
        opacity: 0.7,
        offset: 0.5
      }),
      style({
        transform: 'scale(1) rotate(0deg)',
        opacity: 1,
        offset: 1
      })
    ]))
  ])
])


// Animation for the float effect
export const floatAnimation = trigger('float', [
  state('start', style({
    transform: 'translateY(0)'
  })),
  state('end', style({
    transform: 'translateY(-10px)'
  })),
  transition('start <=> end', [
    animate('2s ease-in-out')
  ])
])


// Animation for the shake effect
export const shakeAnimation = trigger('shake', [
  transition('* => shake', [
    animate('0.5s', keyframes([
      style({ transform: 'translateX(0)', offset: 0 }),
      style({ transform: 'translateX(-10px)', offset: 0.2 }),
      style({ transform: 'translateX(10px)', offset: 0.4 }),
      style({ transform: 'translateX(-10px)', offset: 0.6 }),
      style({ transform: 'translateX(10px)', offset: 0.8 }),
      style({ transform: 'translateX(0)', offset: 1 })
    ]))
  ])
])


// Animation for the rotate effect
export const rotateAnimation = trigger('rotate', [
  state('normal', style({ transform: 'rotate(0)' })),
  state('rotated', style({ transform: 'rotate(180deg)' })),
  transition('normal <=> rotated', [
    animate('0.6s ease-in-out')
  ])
])

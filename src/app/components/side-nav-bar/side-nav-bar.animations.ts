import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const sidenavAnimations = [
  //APERTURA SIDENAV
  trigger('sidenavAnimation', [
    state(
      'open',
      style({
        width: '250px',
        opacity: 1,
      })
    ),
    state(
      'closed',
      style({
        width: '65px',
        opacity: 0.7,
      })
    ),
    transition('open <=> closed', [animate('300ms ease-in-out')]),
  ]),
  trigger('listItemAnimation', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-20px)' }),
      animate(
        '300ms ease-in',
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
    ]),
    transition(':leave', [
      animate(
        '300ms ease-out',
        style({ opacity: 0, transform: 'translateY(-20px)' })
      ),
    ]),
  ]),
  trigger('rotate', [
    state('open', style({ transform: 'rotate(180deg)' })),
    state('closed', style({ transform: 'rotate(0deg)' })),
    transition('open <=> closed', animate('200ms ease-in-out')),
  ]),
  //DESPLEGABLES DEL MENU
  trigger('menuState', [
    state(
      'collapsed',
      style({
        height: '0',
        opacity: 0,
        overflow: 'hidden',
      })
    ),
    state(
      'expanded',
      style({
        height: '*',
        opacity: 1,
        overflow: 'hidden',
      })
    ),
    transition('collapsed <=> expanded', [animate('0.3s ease-in-out')]),
  ]),
];

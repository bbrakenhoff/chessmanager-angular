import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

enum TogglerState {
  Open = 'open',
  Closed = 'closed'
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('togglerAnim', [
      transition('* => void', [
        style({ height: '*' }),
        animate('350ms ease', style({ height: 0 }))
      ]),
      transition('void => *', [
        style({ height: '0' }),
        animate('350ms ease', style({ height: '*' }))
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {
  public togglerIsOpen = false;

  constructor() {}

  ngOnInit() {}

  public onTogglerClicked() {
    this.togglerIsOpen = true;
  }

  public onNavItemClicked() {
    this.togglerIsOpen = false;
  }
}

import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { EnumAware } from '../util/enum-aware.decorator';
import { SvgIcons } from '../shared-components/svg-icon/svg-icons';

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
@EnumAware([{ name: 'SvgIcons', type: SvgIcons }])
export class NavbarComponent implements OnInit {
  togglerIsOpen = false;

  constructor() {}

  ngOnInit() {}

  onTogglerClicked() {
    this.togglerIsOpen = !this.togglerIsOpen;
  }

  onNavItemClicked() {
    this.togglerIsOpen = false;
  }
}

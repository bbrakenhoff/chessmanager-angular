import { Component, OnInit, Input } from '@angular/core';
import { IconSet } from 'src/models/icon-set.model';
import { EnumAware } from 'src/app/util/enum-aware.decorator';

@Component({
  selector: 'app-icon-set',
  templateUrl: './icon-set.component.html',
  styleUrls: ['./icon-set.component.scss']
})
export class IconSetComponent implements OnInit {
  @Input()
  iconSet: IconSet;

  constructor() {}

  ngOnInit() {
    console.log(
      `%cBijoya: icon-set.component -> ngOnInit`,
      'color: deeppink;',
      this.iconSet
    );
  }

  getLinkForIcon(icon: string) {
    return `/assets/icons/icons.svg#${this.iconSet}-${icon}`;
  }
}

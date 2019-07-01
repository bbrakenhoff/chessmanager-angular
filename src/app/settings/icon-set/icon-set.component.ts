import { Component, OnInit, Input } from '@angular/core';
import { IconSet } from 'src/models/icon-set.model';
import { EnumAware } from 'src/app/util/enum-aware.decorator';

@Component({
  selector: 'app-icon-set',
  templateUrl: './icon-set.component.html',
  styleUrls: ['./icon-set.component.scss']
})
export class IconSetComponent {
  @Input()
  iconSet: IconSet;
}

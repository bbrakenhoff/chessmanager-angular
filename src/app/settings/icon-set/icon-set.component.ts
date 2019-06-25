import { Component, OnInit, Input } from '@angular/core';
import { IconSet } from 'src/models/icon-set.model';

@Component({
  selector: 'app-icon-set',
  templateUrl: './icon-set.component.html',
  styleUrls: ['./icon-set.component.scss']
})
export class IconSetComponent implements OnInit {
  @Input()
  iconSet: IconSet;

  constructor() {}

  ngOnInit() {}
}

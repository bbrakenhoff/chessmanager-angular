import { Component, OnInit } from '@angular/core';
import { FenPosition } from 'src/models/fen-position.model';
import { MockData } from 'src/models/mock-data';

@Component({
  selector: 'app-fen-position',
  templateUrl: './fen-position.component.html',
  styleUrls: ['./fen-position.component.scss']
})
export class FenPositionComponent implements OnInit {

  fenPosition = new FenPosition();


  constructor() {
    this.fenPosition.description ='Starting position';
    this.fenPosition.notation  = MockData.fenNotations.startingPosition;
  }

  ngOnInit() {
  }

}

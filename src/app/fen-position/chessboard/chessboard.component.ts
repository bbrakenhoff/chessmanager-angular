import { Component, OnInit, Input } from '@angular/core';
import { FenPosition } from 'src/models/fen-position.model';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent implements OnInit {

  @Input()
  fenPosition: FenPosition;

  constructor() { }

  ngOnInit() {
  }
}

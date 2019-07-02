import { Component, OnInit, Input } from '@angular/core';
import { FenPosition } from 'src/models/fen-position.model';
import { Chessboard } from 'src/models/chessboard.model';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent implements OnInit {

  @Input()
  fenPosition: FenPosition;

  readonly chessboard: Chessboard = new Chessboard();

  constructor() { }

  ngOnInit() {
    this.chessboard.reflectFenPosition(this.fenPosition);
  }
}

import {
  Component,
  OnInit,
  Input,
  DoCheck,
  KeyValueDiffers,
  KeyValueDiffer,
  ChangeDetectorRef
} from '@angular/core';
import { FenDiagram } from '../../../models/fen-diagram.model';
import { Chessboard } from '../../../models/chessboard.model';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent implements OnInit, DoCheck {
  @Input()
  fenDiagram: FenDiagram;

  private _fenDiagramDiffer: KeyValueDiffer<string, any>;

  readonly chessboard: Chessboard =  Chessboard.create();

  constructor(
    private _keyValueDiffers: KeyValueDiffers,
    private _changeDector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._fenDiagramDiffer = this._keyValueDiffers
      .find(this.fenDiagram)
      .create();
    this.chessboard.reflectFenNotation(this.fenDiagram);
  }

  ngDoCheck() {
    const changes = this._fenDiagramDiffer.diff(this.fenDiagram);
    if (changes) {
      this.chessboard.reflectFenNotation(this.fenDiagram);
      this._changeDector.detectChanges();
    }
  }
}

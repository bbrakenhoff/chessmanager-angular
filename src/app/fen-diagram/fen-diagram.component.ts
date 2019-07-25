import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FenDiagram } from 'src/models/fen-diagram.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FenErrorCode } from 'src/models/fen-error-code.model';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../core/storage.service';
import { EnumAware } from '../util/enum-aware.decorator';
import { SvgIcons } from '../shared-components/svg-icon/svg-icons';

@Component({
  selector: 'app-fen-diagram',
  templateUrl: './fen-diagram.component.html',
  styleUrls: ['./fen-diagram.component.scss']
})
@EnumAware([{ name: 'SvgIcons', type: SvgIcons }])
export class FenDiagramComponent implements OnInit {
  private _fenDiagramFromStorage: FenDiagram;
  fenDiagram = FenDiagram.create();
  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _storageService: StorageService
  ) {
    this.form = this._formBuilder.group({
      notation: ['', Validators.required],
      description: ['', Validators.required]
    });

    this._activatedRoute.params.subscribe(params => {
      this._fenDiagramFromStorage = this._storageService.getFenDiagramById(
        params.fenDiagramId
      );

      this.form.valueChanges.subscribe(() => {
        this.updateFenDiagram();
      });

      this.form.setValue({
        notation: this._fenDiagramFromStorage.notation,
        description: this._fenDiagramFromStorage.description
      });
    });
  }

  get validationMessage(): string {
    if (this.fenDiagram.isValid) {
      return 'FEN notation is correct';
    }

    switch (this.fenDiagram.error.code) {
      case FenErrorCode.TooManyPiecesOnRank:
        return `Too many pieces on rank ${this.fenDiagram.error.rank + 1}`;
      case FenErrorCode.TooManyEmptySquaresAddedToRank:
        return `Too many empty squares added to rank ${this.fenDiagram.error
          .rank + 1}`;
      case FenErrorCode.NotEnoughSquaresOnRank:
        return `Not enough squares defined on rank ${this.fenDiagram.error
          .rank + 1}`;
      case FenErrorCode.TooManyRanksDefined:
        return 'Too many ranks defined';
      case FenErrorCode.IllegalCharacterFound:
        return 'Illegal character found';
      case FenErrorCode.NotEnoughSquaresDefined:
        return 'Not enough squares defined';
    }

    return '';
  }

  get errorIndicator(): string {
    if (this.fenDiagram.isValid) {
      return '';
    }

    let whiteSpace = '';
    let i = 0;

    while (i < this.fenDiagram.error.position) {
      whiteSpace += '&nbsp;';
      i++;
    }

    return whiteSpace + '&#94;';
  }

  ngOnInit() {}

  applyStartingPosition() {
    this.form.controls.notation.setValue(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
    );
    this.form.controls.description.setValue('Starting position');

    this.updateFenDiagram();
  }

  applyEmptyBoard() {
    this.form.controls.notation.setValue('8/8/8/8/8/8/8/8');
    this.form.controls.description.setValue('Empty board');

    this.updateFenDiagram();
  }

  updateFenDiagram() {
    console.log(
      `%cBijoya: fen-diagram.component -> updateFenDiagram`,
      'color: deeppink;'
    );
    this.fenDiagram.notation = this.form.value.notation;
    this.fenDiagram.description = this.form.value.description;
  }

  onUndo() {
    this.form.setValue({
      notation: this._fenDiagramFromStorage.notation,
      description: this._fenDiagramFromStorage.description
    });
  }

  onFormSubmit() {
    this.updateFenDiagram();
    this._storageService.saveFenDiagram(this.fenDiagram);
  }
}

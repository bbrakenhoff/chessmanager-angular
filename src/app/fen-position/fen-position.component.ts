import { Component, OnInit } from '@angular/core';
import { FenPosition } from 'src/models/fen-position.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FenErrorCode } from 'src/models/fen-error-code.model';

@Component({
  selector: 'app-fen-position',
  templateUrl: './fen-position.component.html',
  styleUrls: ['./fen-position.component.scss']
})
export class FenPositionComponent implements OnInit {

  fenPosition = new FenPosition();
  form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      notation: [this.fenPosition.notation, Validators.required],
      description: [this.fenPosition.description, Validators.required]
    });

    this.applyStartingPosition();
  }

  get validationMessage(): string {
    if (this.fenPosition.isValid) {
      return 'FEN notation is correct';
    }

    switch (this.fenPosition.error.code) {
      case FenErrorCode.TooManyPiecesOnRank:
        return `Too many pieces on rank ${this.fenPosition.error.rank + 1}`;
      case FenErrorCode.TooManyEmptySquaresAddedToRank:
        return `Too many empty squares added to rank ${this.fenPosition.error.rank + 1}`;
      case FenErrorCode.NotEnoughSquaresOnRank:
        return `Not enough squares defined on rank ${this.fenPosition.error.rank + 1}`;
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
    if (this.fenPosition.isValid) {
      return '';
    }

    let whiteSpace = '';
    let i = 0;

    while (i < this.fenPosition.error.position) {
      whiteSpace += '&nbsp;';
      i++;
    }

    return whiteSpace + '&#94;';
  }

  ngOnInit() {
  }

  applyStartingPosition() {
    this.form.controls.notation.setValue('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
    this.form.controls.description.setValue('Starting position');

    this.onFormSubmit();
  }

  applyEmptyBoard() {
    this.form.controls.notation.setValue('8/8/8/8/8/8/8/8');
    this.form.controls.description.setValue('Empty board');

    this.onFormSubmit();
  }

  onFormSubmit() {
    this.fenPosition.notation = this.form.value.notation;
    this.fenPosition.description = this.form.value.description;
  }
}

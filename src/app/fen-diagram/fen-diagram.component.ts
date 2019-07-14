import { Component, OnInit } from '@angular/core';
import { FenDiagram } from 'src/models/fen-diagram.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FenErrorCode } from 'src/models/fen-error-code.model';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../core/storage.service';

@Component({
  selector: 'app-fen-diagram',
  templateUrl: './fen-diagram.component.html',
  styleUrls: ['./fen-diagram.component.scss']
})
export class FenDiagramComponent implements OnInit {
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
      const fenDiagramFromStorage = this._storageService.getFenDiagramById(
        params.fenDiagramId
      );
      if (fenDiagramFromStorage) {
        this.fenDiagram = fenDiagramFromStorage;
      } else {
        this.applyStartingPosition();
      }

      this.form.setValue({
        notation: this.fenDiagram.notation,
        description: this.fenDiagram.description
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

    this.onFormSubmit();
  }

  applyEmptyBoard() {
    this.form.controls.notation.setValue('8/8/8/8/8/8/8/8');
    this.form.controls.description.setValue('Empty board');

    this.onFormSubmit();
  }

  onFormSubmit() {
    this.fenDiagram.notation = this.form.value.notation;
    this.fenDiagram.description = this.form.value.description;
  }
}

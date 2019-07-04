import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FenPosition } from 'src/models/fen-position.model';
import { MockData } from 'src/models/mock-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  get validationMessage() {
    return '';
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

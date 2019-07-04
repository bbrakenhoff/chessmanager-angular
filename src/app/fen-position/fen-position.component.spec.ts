import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FenPositionComponent } from './fen-position.component';
import { MockData } from 'src/models/mock-data';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FenPosition } from 'src/models/fen-position.model';
import { spy, verify } from 'ts-mockito';

describe('FenPositionComponent', () => {
  let component: FenPositionComponent;
  let fixture: ComponentFixture<FenPositionComponent>;
  let componentSpy: FenPositionComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FenPositionComponent],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FenPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    componentSpy = spy(component);
  });

  describe('constructor', () => {

    it('should build the form', () => {
      component.fenPosition = new FenPosition();
      component.fenPosition.notation = MockData.fenNotations.eightQueensSolution;
      component.fenPosition.description = 'Test position description';

      expect(component.form).toBeDefined();
      expect(component.form.controls.notation).toBeDefined();
      expect(component.form.controls.notation.validator).toEqual(Validators.required);
      expect(component.form.controls.description).toBeDefined();
      expect(component.form.controls.description.validator).toEqual(Validators.required);
    });
  });

  describe('applyStartingPosition()', () => {

    it('should apply the starting position to the form and submit', () => {
      component.applyStartingPosition();
      expect(component.form.controls.notation.value).toEqual(MockData.fenNotations.startingPosition);
      expect(component.form.controls.description.value).toEqual('Starting position');
      verify(componentSpy.onFormSubmit()).once();
    });
  });

  describe('applyEmptyBoard()', () => {
    it('should apply the starting position to the form and submit', () => {
      component.applyEmptyBoard();
      expect(component.form.controls.notation.value).toEqual(MockData.fenNotations.emptyBoard);
      expect(component.form.controls.description.value).toEqual('Empty board');
      verify(componentSpy.onFormSubmit()).once();
    });
  });

  describe('onFormSubmit()', () => {
    it('should write the form values to the fen position', () => {
      component.fenPosition = new FenPosition();
      component.fenPosition.notation = MockData.fenNotations.eightQueensSolution;
      component.fenPosition.description = 'Eight queens solution';

      component.form.controls.notation.setValue(MockData.fenNotations.startingPosition);
      component.form.controls.description.setValue('Starting position');

      component.onFormSubmit();
      expect(component.fenPosition.notation).toEqual(MockData.fenNotations.startingPosition);
      expect(component.fenPosition.description).toEqual('Starting position');
    });
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FenPositionComponent } from './fen-position.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { spy, verify } from 'ts-mockito';
import { TestDataFactory } from '../util/test-data-factory';

describe('FenPositionComponent', () => {
  const testFenNotations = TestDataFactory.createFenNotations();

  let component: FenPositionComponent;
  let fixture: ComponentFixture<FenPositionComponent>;
  let componentSpy: FenPositionComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FenPositionComponent],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FenPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    componentSpy = spy(component);
  });

  describe('constructor', () => {
    it('should build the form', () => {
      component.fenPosition.notation =
      testFenNotations.eightQueensSolution;
      component.fenPosition.description = 'Test position description';

      expect(component.form).toBeDefined();
      expect(component.form.controls.notation).toBeDefined();
      expect(component.form.controls.notation.validator).toEqual(
        Validators.required
      );
      expect(component.form.controls.description).toBeDefined();
      expect(component.form.controls.description.validator).toEqual(
        Validators.required
      );
    });
  });

  describe('applyStartingPosition()', () => {
    it('should apply the starting position to the form and submit', () => {
      component.applyStartingPosition();
      expect(component.form.controls.notation.value).toEqual(
        testFenNotations.startingPosition
      );
      expect(component.form.controls.description.value).toEqual(
        'Starting position'
      );
      verify(componentSpy.onFormSubmit()).once();
    });
  });

  describe('applyEmptyBoard()', () => {
    it('should apply the starting position to the form and submit', () => {
      component.applyEmptyBoard();
      expect(component.form.controls.notation.value).toEqual(
        testFenNotations.emptyBoard
      );
      expect(component.form.controls.description.value).toEqual('Empty board');
      verify(componentSpy.onFormSubmit()).once();
    });
  });

  describe('onFormSubmit()', () => {
    it('should write the form values to the fen position', () => {
      component.fenPosition.notation =
        testFenNotations.eightQueensSolution;
      component.fenPosition.description = 'Eight queens solution';

      component.form.controls.notation.setValue(
        testFenNotations.startingPosition
      );
      component.form.controls.description.setValue('Starting position');

      component.onFormSubmit();
      expect(component.fenPosition.notation).toEqual(
        testFenNotations.startingPosition
      );
      expect(component.fenPosition.description).toEqual('Starting position');
    });
  });

  describe('get validationMessage()', () => {
    it('should return "FEN notation is correct" when fen position is valid', () => {
      component.fenPosition.notation = testFenNotations.startingPosition;
      expect(component.validationMessage).toEqual('FEN notation is correct');
    });

    it('should return "Too many pieces on rank 3" when too many pieces on a rank', () => {
      component.fenPosition.notation =
        testFenNotations.tooManyPiecesOnRank;
      expect(component.validationMessage).toEqual('Too many pieces on rank 3');
    });

    it('should return "Too many empty squares added to rank 2" when too many pieces added to a rank', () => {
      component.fenPosition.notation =
        testFenNotations.tooManyEmptySquaresToRank;
      expect(component.validationMessage).toEqual(
        'Too many empty squares added to rank 2'
      );
    });

    it('should return "Not enough squares defined on rank 2" when not enough squares added to a rank', () => {
      component.fenPosition.notation =
        testFenNotations.notEnoughSquaresOnRank;
      expect(component.validationMessage).toEqual(
        'Not enough squares defined on rank 2'
      );
    });

    it('should return "Too many ranks defined" when too many ranks defined', () => {
      component.fenPosition.notation =
        testFenNotations.tooManyRanksDefined;
      expect(component.validationMessage).toEqual('Too many ranks defined');
    });

    it('should return "Illegal character found" when illegal character found', () => {
      component.fenPosition.notation =
        testFenNotations.illegalCharacterFound;
      expect(component.validationMessage).toEqual('Illegal character found');
    });

    it('should return "Not enough squares defined" when not enough squares defined', () => {
      component.fenPosition.notation =
        testFenNotations.notEnoughSquaresDefined;
      expect(component.validationMessage).toEqual('Not enough squares defined');
    });
  });

  describe('get errorIndicator()', () => {
    it('should return empty string when fen position is valid', () => {
      component.fenPosition.notation = testFenNotations.startingPosition;
      expect(component.errorIndicator).toEqual('');
    });

    it('should return a text containing spaces until the error position ending with a ^ when fen positio is invalid', () => {
      component.fenPosition.notation =
        testFenNotations.tooManyPiecesOnRank;
      expect(component.errorIndicator).toEqual(
        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#94;'
      );
    });
  });
});

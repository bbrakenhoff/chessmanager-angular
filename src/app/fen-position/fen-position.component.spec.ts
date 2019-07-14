import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FenPositionComponent } from './fen-position.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  spy,
  verify,
  mock,
  when,
  instance,
  anyString,
  reset
} from 'ts-mockito';
import { TestDataFactory } from '../util/test-data-factory';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../core/storage.service';
import * as uuid from 'uuid/v4';
import { of } from 'rxjs';
import { FenPosition } from 'src/models/fen-position.model';

describe('FenPositionComponent', () => {
  const testData = {
    testFenNotations: TestDataFactory.createFenNotations(),
    fenPositions: TestDataFactory.createFenPositions(),
    collectionId: uuid(),
    // get collectionId() {
    //   return this.fenPosition[0].collectionId;
    // },
    get fenPositionId() {
      return this.fenPositions[0].id;
    }
  };

  let component: FenPositionComponent;
  let fixture: ComponentFixture<FenPositionComponent>;
  let componentSpy: FenPositionComponent;

  const activatedRouteMock = mock(ActivatedRoute);
  const storageServiceMock = mock(StorageService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FenPositionComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useFactory: () => {
            when(activatedRouteMock.params).thenReturn(
              of({
                collectionId: testData.collectionId,
                fenPositionId: testData.fenPositionId
              })
            );
            return instance(activatedRouteMock);
          }
        },
        {
          provide: StorageService,
          useValue: instance(storageServiceMock)
          // useFactory: () => {
          //   when(storageServiceMock.collections).thenReturn([]);
          //   // when(storageServiceMock.getFenPositionById(anyString())).thenReturn(
          //   //   testData.fenPositions[0]
          //   // );
          //   return instance(storageServiceMock);
          // }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    when(storageServiceMock.collections).thenReturn([]);
    when(storageServiceMock.getFenPositionById(anyString())).thenReturn(
      testData.fenPositions[0]
    );

    fixture = TestBed.createComponent(FenPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    componentSpy = spy(component);
  });

  afterEach(() => {
    reset(activatedRouteMock);
    reset(storageServiceMock);
  });

  describe('constructor', () => {
    afterEach(() => {
      testData.fenPositions[0].collectionId = '';
    });

    it('should get the fen position from storage', () => {
      testData.fenPositions[0].collectionId = testData.collectionId;
      verify(
        storageServiceMock.getFenPositionById(testData.fenPositionId)
      ).once();
      expect(component.fenPosition).toEqual(testData.fenPositions[0]);
    });

    it('should apply starting position to a new fen position when nothing retrieved from storage', () => {
      const notation = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
      const description = 'Starting position';
      reset(storageServiceMock);
      when(storageServiceMock.getFenPositionById(anyString())).thenReturn(null);

      // Recreate component, otherwise the alterations to mock do not work
      fixture = TestBed.createComponent(FenPositionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      verify(
        storageServiceMock.getFenPositionById(testData.fenPositionId)
      ).once();
      expect(testData.fenPositions).not.toContain(component.fenPosition);
      expect(component.form.value).toEqual({notation, description});
      expect(component.fenPosition.notation).toEqual(notation);
      expect(component.fenPosition.description).toEqual(description);
    });

    it('should build the form', () => {
      component.fenPosition.notation =
        testData.testFenNotations.eightQueensSolution;
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
        testData.testFenNotations.startingPosition
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
        testData.testFenNotations.emptyBoard
      );
      expect(component.form.controls.description.value).toEqual('Empty board');
      verify(componentSpy.onFormSubmit()).once();
    });
  });

  describe('onFormSubmit()', () => {
    it('should write the form values to the fen position', () => {
      component.fenPosition.notation =
        testData.testFenNotations.eightQueensSolution;
      component.fenPosition.description = 'Eight queens solution';

      component.form.controls.notation.setValue(
        testData.testFenNotations.startingPosition
      );
      component.form.controls.description.setValue('Starting position');

      component.onFormSubmit();
      expect(component.fenPosition.notation).toEqual(
        testData.testFenNotations.startingPosition
      );
      expect(component.fenPosition.description).toEqual('Starting position');
    });
  });

  describe('get validationMessage()', () => {
    beforeEach(() => {
      component.fenPosition = FenPosition.create();
    });

    it('should return "FEN notation is correct" when fen position is valid', () => {
      component.fenPosition.notation =
        testData.testFenNotations.startingPosition;
      expect(component.validationMessage).toEqual('FEN notation is correct');
    });

    it('should return "Too many pieces on rank 3" when too many pieces on a rank', () => {
      component.fenPosition.notation =
        testData.testFenNotations.tooManyPiecesOnRank;
      expect(component.validationMessage).toEqual('Too many pieces on rank 3');
    });

    it('should return "Too many empty squares added to rank 2" when too many pieces added to a rank', () => {
      component.fenPosition.notation =
        testData.testFenNotations.tooManyEmptySquaresToRank;
      expect(component.validationMessage).toEqual(
        'Too many empty squares added to rank 2'
      );
    });

    it('should return "Not enough squares defined on rank 2" when not enough squares added to a rank', () => {
      component.fenPosition.notation =
        testData.testFenNotations.notEnoughSquaresOnRank;
      expect(component.validationMessage).toEqual(
        'Not enough squares defined on rank 2'
      );
    });

    it('should return "Too many ranks defined" when too many ranks defined', () => {
      component.fenPosition.notation =
        testData.testFenNotations.tooManyRanksDefined;
      expect(component.validationMessage).toEqual('Too many ranks defined');
    });

    it('should return "Illegal character found" when illegal character found', () => {
      component.fenPosition.notation =
        testData.testFenNotations.illegalCharacterFound;
      expect(component.validationMessage).toEqual('Illegal character found');
    });

    it('should return "Not enough squares defined" when not enough squares defined', () => {
      component.fenPosition.notation =
        testData.testFenNotations.notEnoughSquaresDefined;
      expect(component.validationMessage).toEqual('Not enough squares defined');
    });
  });

  describe('get errorIndicator()', () => {
    beforeEach(() => {
      component.fenPosition = FenPosition.create();
    });

    it('should return empty string when fen position is valid', () => {
      component.fenPosition.notation =
        testData.testFenNotations.startingPosition;
      expect(component.errorIndicator).toEqual('');
    });

    it('should return a text containing spaces until the error position ending with a ^ when fen positio is invalid', () => {
      component.fenPosition.notation =
        testData.testFenNotations.tooManyPiecesOnRank;
      expect(component.errorIndicator).toEqual(
        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#94;'
      );
    });
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FenDiagramComponent } from './fen-diagram.component';
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
import { FenDiagram } from 'src/models/fen-diagram.model';

describe('FenDiagramComponent', () => {
  const testData = {
    testFenNotations: TestDataFactory.createFenNotations(),
    fenDiagrams: TestDataFactory.createFenDiagrams(),
    collectionId: uuid(),
    get fenDiagramId() {
      return this.fenDiagrams[0].id;
    }
  };

  let component: FenDiagramComponent;
  let fixture: ComponentFixture<FenDiagramComponent>;
  let componentSpy: FenDiagramComponent;

  const activatedRouteMock = mock(ActivatedRoute);
  const storageServiceMock = mock(StorageService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FenDiagramComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useFactory: () => {
            when(activatedRouteMock.params).thenReturn(
              of({
                collectionId: testData.collectionId,
                fenDiagramId: testData.fenDiagramId
              })
            );
            return instance(activatedRouteMock);
          }
        },
        {
          provide: StorageService,
          useValue: instance(storageServiceMock)
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    when(storageServiceMock.collections).thenReturn([]);
    when(storageServiceMock.getFenDiagramById(anyString())).thenReturn(
      testData.fenDiagrams[0]
    );

    fixture = TestBed.createComponent(FenDiagramComponent);
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
      testData.fenDiagrams[0].collectionId = '';
    });

    it('should get the fen diagram from storage', () => {
      testData.fenDiagrams[0].collectionId = testData.collectionId;
      verify(
        storageServiceMock.getFenDiagramById(testData.fenDiagramId)
      ).once();
      expect(component.form.value).toEqual({
        notation: testData.fenDiagrams[0].notation,
        description: testData.fenDiagrams[0].description
      });
      expect(component.fenDiagram).toEqual(testData.fenDiagrams[0]);
    });

    it('should apply starting position to a new fen diagram when nothing retrieved from storage', () => {
      const notation = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
      const description = 'Starting position';
      reset(storageServiceMock);
      when(storageServiceMock.getFenDiagramById(anyString())).thenReturn(null);

      // Recreate component, otherwise the alterations to mock do not work
      fixture = TestBed.createComponent(FenDiagramComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      verify(
        storageServiceMock.getFenDiagramById(testData.fenDiagramId)
      ).once();
      expect(testData.fenDiagrams).not.toContain(component.fenDiagram);
      expect(component.form.value).toEqual({ notation, description });
      expect(component.fenDiagram.notation).toEqual(notation);
      expect(component.fenDiagram.description).toEqual(description);
    });

    it('should build the form', () => {
      component.fenDiagram.notation =
        testData.testFenNotations.eightQueensSolution;
      component.fenDiagram.description = 'Test position description';

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
      verify(componentSpy.updateFenDiagram()).once();
    });
  });

  describe('applyEmptyBoard()', () => {
    it('should apply the starting position to the form and submit', () => {
      component.applyEmptyBoard();
      expect(component.form.controls.notation.value).toEqual(
        testData.testFenNotations.emptyBoard
      );
      expect(component.form.controls.description.value).toEqual('Empty board');
      verify(componentSpy.updateFenDiagram()).once();
    });
  });

  describe('updateFenDiagram()', () => {
    it('should write the form values to the fen diagram', () => {
      component.fenDiagram.notation =
        testData.testFenNotations.eightQueensSolution;
      component.fenDiagram.description = 'Eight queens solution';

      component.form.controls.notation.setValue(
        testData.testFenNotations.startingPosition
      );
      component.form.controls.description.setValue('Starting position');

      component.updateFenDiagram();
      expect(component.fenDiagram.notation).toEqual(
        testData.testFenNotations.startingPosition
      );
      expect(component.fenDiagram.description).toEqual('Starting position');
    });
  });

  describe('onFormSubmit()', () => {
    it('should write the updated fen diagram to the storage', () => {
    });
  });

  describe('get validationMessage()', () => {
    beforeEach(() => {
      component.fenDiagram = FenDiagram.create();
    });

    it('should return "FEN notation is correct" when fen diagram is valid', () => {
      component.fenDiagram.notation =
        testData.testFenNotations.startingPosition;
      expect(component.validationMessage).toEqual('FEN notation is correct');
    });

    it('should return "Too many pieces on rank 3" when too many pieces on a rank', () => {
      component.fenDiagram.notation =
        testData.testFenNotations.tooManyPiecesOnRank;
      expect(component.validationMessage).toEqual('Too many pieces on rank 3');
    });

    it('should return "Too many empty squares added to rank 2" when too many pieces added to a rank', () => {
      component.fenDiagram.notation =
        testData.testFenNotations.tooManyEmptySquaresToRank;
      expect(component.validationMessage).toEqual(
        'Too many empty squares added to rank 2'
      );
    });

    it('should return "Not enough squares defined on rank 2" when not enough squares added to a rank', () => {
      component.fenDiagram.notation =
        testData.testFenNotations.notEnoughSquaresOnRank;
      expect(component.validationMessage).toEqual(
        'Not enough squares defined on rank 2'
      );
    });

    it('should return "Too many ranks defined" when too many ranks defined', () => {
      component.fenDiagram.notation =
        testData.testFenNotations.tooManyRanksDefined;
      expect(component.validationMessage).toEqual('Too many ranks defined');
    });

    it('should return "Illegal character found" when illegal character found', () => {
      component.fenDiagram.notation =
        testData.testFenNotations.illegalCharacterFound;
      expect(component.validationMessage).toEqual('Illegal character found');
    });

    it('should return "Not enough squares defined" when not enough squares defined', () => {
      component.fenDiagram.notation =
        testData.testFenNotations.notEnoughSquaresDefined;
      expect(component.validationMessage).toEqual('Not enough squares defined');
    });
  });

  describe('get errorIndicator()', () => {
    beforeEach(() => {
      component.fenDiagram = FenDiagram.create();
    });

    it('should return empty string when fen diagram is valid', () => {
      component.fenDiagram.notation =
        testData.testFenNotations.startingPosition;
      expect(component.errorIndicator).toEqual('');
    });

    it('should return a text containing spaces until the error position ending with a ^ when fen positio is invalid', () => {
      component.fenDiagram.notation =
        testData.testFenNotations.tooManyPiecesOnRank;
      expect(component.errorIndicator).toEqual(
        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#94;'
      );
    });
  });
});

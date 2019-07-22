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
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FenDiagram } from 'src/models/fen-diagram.model';
import { StorageService } from '../core/storage.service';
import { Collection } from 'src/models/collection.model';
import { GlobalTestDataFactory } from '../util/test-data-factory';

class TestDataFactory {
  static createFenNotations() {
    return GlobalTestDataFactory.createFenNotations();
  }

  static createTestCollectionWithFenDiagrams() {
    return GlobalTestDataFactory.createTestCollection();
  }
}

describe('FenDiagramComponent', () => {
  const testCollection = TestDataFactory.createTestCollectionWithFenDiagrams();
  const testNotations = TestDataFactory.createFenNotations();

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
                collectionId: testCollection.collection.id,
                fenDiagramId: testCollection.fenDiagrams.startingPosition.id
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
    when(storageServiceMock.getCollections()).thenReturn([]);
    when(storageServiceMock.getFenDiagramById(anyString())).thenReturn(
      testCollection.fenDiagrams.startingPosition
    );

    fixture = TestBed.createComponent(FenDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    componentSpy = spy(component);
  });

  afterEach(() => {
    reset(activatedRouteMock);
    reset(storageServiceMock);
    reset(componentSpy);
  });

  describe('constructor', () => {
    it('should get the fen diagram from storage', () => {
      verify(
        storageServiceMock.getFenDiagramById(
          testCollection.fenDiagrams.startingPosition.id
        )
      ).once();
      expect(component.form.value).toEqual({
        notation: testCollection.fenDiagrams.startingPosition.notation,
        description: testCollection.fenDiagrams.startingPosition.description
      });
      expect(component.fenDiagram).toEqual(
        testCollection.fenDiagrams.startingPosition
      );
    });

    it('should build the form', () => {
      component.fenDiagram.notation = testNotations.eightQueensSolution;
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

      expect(component.form.value).toEqual({
        notation: testCollection.fenDiagrams.startingPosition.notation,
        description: testCollection.fenDiagrams.startingPosition.description
      });
      verify(componentSpy.updateFenDiagram()).called();
    });
  });

  describe('applyEmptyBoard()', () => {
    it('should apply the starting position to the form and submit', () => {
      component.applyEmptyBoard();
      expect(component.form.value).toEqual({
        notation: testCollection.fenDiagrams.emptyBoard.notation,
        description: testCollection.fenDiagrams.emptyBoard.description
      });
      verify(componentSpy.updateFenDiagram()).called();
    });
  });

  describe('updateFenDiagram()', () => {
    it('should write the form values to the fen diagram', () => {
      component.fenDiagram = testCollection.fenDiagrams.foolsMate;

      component.form.controls.notation.setValue(
        testCollection.fenDiagrams.startingPosition.notation
      );
      component.form.controls.description.setValue(
        testCollection.fenDiagrams.startingPosition.description
      );

      component.updateFenDiagram();
      expect(component.fenDiagram.notation).toEqual(
        component.form.value.notation
      );
      expect(component.fenDiagram.description).toEqual(
        component.form.value.description
      );
    });
  });

  describe('onFormSubmit()', () => {
    it('should write the updated fen diagram to the storage', () => {});
  });

  describe('get validationMessage()', () => {
    beforeEach(() => {
      component.fenDiagram = FenDiagram.create();
    });

    it('should return "FEN notation is correct" when fen diagram is valid', () => {
      component.fenDiagram.notation = testNotations.startingPosition;
      expect(component.validationMessage).toEqual('FEN notation is correct');
    });

    it('should return "Too many pieces on rank 3" when too many pieces on a rank', () => {
      component.fenDiagram.notation = testNotations.tooManyPiecesOnRank;
      expect(component.validationMessage).toEqual('Too many pieces on rank 3');
    });

    it('should return "Too many empty squares added to rank 2" when too many pieces added to a rank', () => {
      component.fenDiagram.notation = testNotations.tooManyEmptySquaresToRank;
      expect(component.validationMessage).toEqual(
        'Too many empty squares added to rank 2'
      );
    });

    it('should return "Not enough squares defined on rank 2" when not enough squares added to a rank', () => {
      component.fenDiagram.notation = testNotations.notEnoughSquaresOnRank;
      expect(component.validationMessage).toEqual(
        'Not enough squares defined on rank 2'
      );
    });

    it('should return "Too many ranks defined" when too many ranks defined', () => {
      component.fenDiagram.notation = testNotations.tooManyRanksDefined;
      expect(component.validationMessage).toEqual('Too many ranks defined');
    });

    it('should return "Illegal character found" when illegal character found', () => {
      component.fenDiagram.notation = testNotations.illegalCharacterFound;
      expect(component.validationMessage).toEqual('Illegal character found');
    });

    it('should return "Not enough squares defined" when not enough squares defined', () => {
      component.fenDiagram.notation = testNotations.notEnoughSquaresDefined;
      expect(component.validationMessage).toEqual('Not enough squares defined');
    });
  });

  describe('get errorIndicator()', () => {
    beforeEach(() => {
      component.fenDiagram = FenDiagram.create();
    });

    it('should return empty string when fen diagram is valid', () => {
      component.fenDiagram.notation = testNotations.startingPosition;
      expect(component.errorIndicator).toEqual('');
    });

    it('should return a text containing spaces until the error position ending with a ^ when fen positio is invalid', () => {
      component.fenDiagram.notation = testNotations.tooManyPiecesOnRank;
      expect(component.errorIndicator).toEqual(
        '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#94;'
      );
    });
  });
});

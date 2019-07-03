import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FenPositionComponent } from './fen-position.component';
import { MockData } from 'src/models/mock-data';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FenPositionComponent', () => {
  let component: FenPositionComponent;
  let fixture: ComponentFixture<FenPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FenPositionComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FenPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('applyStartingPosition()', () => {

    it('should apply the starting position to the fen position', () => {
      component.applyStartingPosition();
      expect(component.fenPosition.notation).toEqual(MockData.fenNotations.startingPosition);
      expect(component.fenPosition.description).toEqual('Starting position');
    });
  });

  describe('applyEmptyBoard()', () => {
    it('should apply the starting position to the fen position', () => {
      component.applyEmptyBoard();
      expect(component.fenPosition.notation).toEqual(MockData.fenNotations.emptyBoard);
      expect(component.fenPosition.description).toEqual('Empty board');
    });
  });
});

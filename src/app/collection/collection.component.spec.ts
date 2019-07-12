import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionComponent } from './collection.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { when, instance, mock } from 'ts-mockito';
import { of } from 'rxjs';
import * as uuid from 'uuid/v4';

describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;

  const activatedRouteMock = mock(ActivatedRoute);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useFactory: () => {
            when(activatedRouteMock.params).thenReturn(of({ id: uuid() }));
            return instance(activatedRouteMock);
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

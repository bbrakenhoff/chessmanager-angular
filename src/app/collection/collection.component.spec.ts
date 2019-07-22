import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionComponent } from './collection.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { when, instance, mock, anyString, verify } from 'ts-mockito';
import { of } from 'rxjs';
import * as uuid from 'uuid/v4';
import { StorageService } from '../core/storage.service';

describe('CollectionComponent', () => {
  const testCollectionId = uuid();

  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;

  const activatedRouteMock = mock(ActivatedRoute);
  const storageServiceMock = mock(StorageService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useFactory: () => {
            when(activatedRouteMock.params).thenReturn(
              of({ collectionId: testCollectionId })
            );
            return instance(activatedRouteMock);
          }
        },
        {
          provide: StorageService,
          useFactory: () => {
            when(
              storageServiceMock.getFenDiagramsByCollectionId(anyString())
            ).thenReturn([]);
            return instance(storageServiceMock);
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
    verify(
      storageServiceMock.getFenDiagramsByCollectionId(testCollectionId)
    ).once();
  });
});

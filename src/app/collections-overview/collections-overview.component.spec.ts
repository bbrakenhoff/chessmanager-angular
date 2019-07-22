import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionsOverviewComponent } from './collections-overview.component';
import { mock, instance, when, verify } from 'ts-mockito';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StorageService } from '../core/storage.service';
import { FormBuilder } from '@angular/forms';

describe('CollectionsOverviewComponent', () => {
  let component: CollectionsOverviewComponent;
  let fixture: ComponentFixture<CollectionsOverviewComponent>;

  const storageServiceMock = mock(StorageService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionsOverviewComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: StorageService,
          useFactory: () => {
            when(storageServiceMock.getCollections()).thenReturn([]);
            return instance(storageServiceMock);
          }
        },
        FormBuilder
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    verify(storageServiceMock.getCollections()).once();
  });
});

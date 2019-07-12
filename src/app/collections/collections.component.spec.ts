import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsComponent } from './collections.component';
import { StorageService } from '../core/storage.service';
import { mock, instance, when } from 'ts-mockito';

describe('CollectionsComponent', () => {
  let component: CollectionsComponent;
  let fixture: ComponentFixture<CollectionsComponent>;

  const storageServiceMock = mock(StorageService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionsComponent],
      providers: [
        {
          provide: StorageService,
          useFactory: () => {
            when(storageServiceMock.collections).thenReturn([]);
            return instance(storageServiceMock);
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsOverviewComponent } from './collections-overview.component';
import { StorageService } from '../core/storage.service';
import { mock, instance, when } from 'ts-mockito';

describe('CollectionsComponent', () => {
  let component: CollectionsOverviewComponent;
  let fixture: ComponentFixture<CollectionsOverviewComponent>;

  const storageServiceMock = mock(StorageService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionsOverviewComponent],
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
    fixture = TestBed.createComponent(CollectionsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

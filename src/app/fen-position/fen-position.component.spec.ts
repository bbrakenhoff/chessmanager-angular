import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FenPositionComponent } from './fen-position.component';

describe('FenPositionComponent', () => {
  let component: FenPositionComponent;
  let fixture: ComponentFixture<FenPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FenPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FenPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

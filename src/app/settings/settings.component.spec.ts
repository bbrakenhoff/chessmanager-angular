import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { FormBuilder, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IconSet } from 'src/models/icon-set.model';
import { mock, instance, reset, verify, when, anyString } from 'ts-mockito';
import { StorageService } from '../core/storage.service';

describe('SettingsComponent', () => {
  let fixture: ComponentFixture<SettingsComponent>;
  let component: SettingsComponent;

  const storageServiceMock = mock(StorageService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      providers: [
        FormBuilder,
        {
          provide: StorageService,
          useFactory: () => {
            when(storageServiceMock.iconSet).thenReturn(IconSet.Maya);
            return instance(storageServiceMock);
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    reset(storageServiceMock);
  });

  describe('constructor', () => {
    it('should build the form', () => {
      expect(component.form).toBeDefined();
      expect(component.form.controls.iconSet).toBeDefined();
      expect(component.form.controls.iconSet.validator).toEqual(
        Validators.required
      );
      verify(storageServiceMock.iconSet).once();
      expect(component.form.controls.iconSet.value).toEqual(IconSet.Maya);
    });
  });

  describe('openIconSetCard()', () => {
    it('should set the icon card open', () => {
      expect(component.iconSetCardIsOpen).toEqual(false);
      component.openIconSetCard();
      expect(component.iconSetCardIsOpen).toEqual(true);
    });
  });

  describe('onFormSubmit()', () => {
    it('should close the icon card after the icon set changed', () => {
      const newIconSet = IconSet.Maya;
      component.form.controls.iconSet.setValue(newIconSet);

      component.iconSetCardIsOpen = true;
      expect(component.iconSetCardIsOpen).toEqual(true);
      component.onFormSubmit();
      verify(storageServiceMock.setIconSet(anyString())).once();
      expect(component.currenticonSet).toEqual(newIconSet);
      expect(component.iconSetCardIsOpen).toEqual(false);
    });
  });

  describe('isIconSetSelected(iconSet:IconSet):boolean', () => {
    it('should return false when the form value does not equal the given icon set', () => {
      component.form.controls.iconSet.setValue(IconSet.Alpha);
      const isSelected = component.isIconSetSelected(IconSet.Maya);
      expect(isSelected).toEqual(false);
    });

    it('should return true when the form value equals the given icon set', () => {
      component.form.controls.iconSet.setValue(IconSet.Alpha);
      const isSelected = component.isIconSetSelected(IconSet.Alpha);
      expect(isSelected).toEqual(true);
    });
  });
});

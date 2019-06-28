import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { FormBuilder, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IconSet } from 'src/models/icon-set.model';

describe('SettingsComponent', () => {
  let fixture: ComponentFixture<SettingsComponent>;
  let component: SettingsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      providers: [FormBuilder],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
  });

  describe('constructor', () => {
    it('should build the form', () => {
      expect(component.form).toBeDefined();
      expect(component.form.controls.iconSet).toBeDefined();
      expect(component.form.controls.iconSet.validator).toEqual(
        Validators.required
      );
    });

    // it('should close the form when icon set has been selected', () => {
    //   spyOn(component as any, '_onIconSetChanged').and.callThrough();
    //   component.form.controls.iconSet.setValue(IconSet.Maya);
    //   expect((component as any)._onIconSetChanged).toHaveBeenCalled();
    // });
  });

  describe('openIconSetCard()', () => {
    it('should set the icon card open', () => {
      expect(component.iconSetCardIsOpen).toEqual(false);
      component.openIconSetCard();
      expect(component.iconSetCardIsOpen).toEqual(true);
    });
  });

  describe('onIconSetChanged(value)', () => {
    it('should close the icon card after the icon set changed', () => {
      component.iconSetCardIsOpen = true;
      expect(component.iconSetCardIsOpen).toEqual(true);
      component.onFormSubmit();
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

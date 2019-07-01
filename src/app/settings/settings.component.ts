import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnumAware } from '../util/enum-aware.decorator';
import { IconSet } from 'src/models/icon-set.model';
import { StorageService } from '../core/storage.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
@EnumAware([{ name: 'IconSet', type: IconSet }])
export class SettingsComponent {
  iconSetCardIsOpen = false;
  currenticonSet: IconSet;
  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _storageService: StorageService
  ) {
    this.currenticonSet = this._storageService.iconSet;
    this.form = this._formBuilder.group({
      iconSet: [this.currenticonSet, Validators.required]
    });
  }

  openIconSetCard() {
    this.iconSetCardIsOpen = true;
  }

  onFormSubmit() {
    this._storageService.setIconSet(this.form.controls.iconSet.value);
    this.currenticonSet = this._storageService.iconSet;
    this.iconSetCardIsOpen = false;
  }

  isIconSetSelected(iconSet: IconSet): boolean {
    return this.form.controls.iconSet.value === iconSet;
  }
}

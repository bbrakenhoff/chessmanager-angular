import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnumAware } from '../util/enum-aware.decorator';
import { IconSet } from 'src/models/icon-set.model';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
@EnumAware([{ name: 'IconSet', type: IconSet }])
export class SettingsComponent implements OnInit {
  iconSetCardIsOpen = false;

  form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      iconSet: ['', Validators.required]
    });
  }

  ngOnInit() {}

  openIconSetCard() {
    this.iconSetCardIsOpen = true;
  }

  onFormSubmit() {
    this.iconSetCardIsOpen = false;
  }

  isIconSetSelected(iconSet: IconSet): boolean {
    return this.form.controls.iconSet.value === iconSet;
  }
}

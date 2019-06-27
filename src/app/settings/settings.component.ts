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

    this.form.controls.iconSet.valueChanges.subscribe(value =>
      this._onIconSetChanged(value)
    );
  }

  ngOnInit() {}

  openIconSetCard() {
    this.iconSetCardIsOpen = true;
  }

  private _onIconSetChanged(value) {
    console.log(
      `%cBijoya: settings.component -> valueChanges`,
      'color: deeppink;',
      value
    );
    this.iconSetCardIsOpen = false;
  }

  selectIconSet(iconSet: IconSet) {
    this.form.controls.iconSet.setValue(iconSet);
  }

  isIconSetSelected(iconSet: IconSet): boolean {
    console.log(
      `%cBijoya: settings.component -> _isIconSetSelected`,
      'color: orange;'
    );
    return this.form.controls.iconSet.value === iconSet;
  }
}

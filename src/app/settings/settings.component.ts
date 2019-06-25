import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  iconSetCardIsOpen = false;

  form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      iconSet: ['', Validators.required]
    });

    this.form.valueChanges.subscribe((value) => {
      console.log(`%cBijoya: settings.component -> valueChanges`, 'color: deeppink;', value);
      this.iconSetCardIsOpen = false;
    });
  }

  ngOnInit() {

  }

  openIconSetCard() {
    this.iconSetCardIsOpen = true;
  }
}

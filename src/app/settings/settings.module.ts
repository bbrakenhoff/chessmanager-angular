import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IconSetComponent } from './icon-set/icon-set.component';

@NgModule({
  declarations: [SettingsComponent, IconSetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule { }

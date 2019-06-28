import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IconSetComponent } from './icon-set/icon-set.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [SettingsComponent, IconSetComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    SharedComponentsModule
  ]
})
export class SettingsModule { }

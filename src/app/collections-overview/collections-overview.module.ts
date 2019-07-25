import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsOverviewComponent } from './collections-overview.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

@NgModule({
  declarations: [CollectionsOverviewComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
})
export class CollectionsOverviewModule { }

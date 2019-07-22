import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsOverviewComponent } from './collections-overview.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CollectionsOverviewComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class CollectionsOverviewModule { }

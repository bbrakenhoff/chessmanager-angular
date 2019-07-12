import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsOverviewComponent } from './collections-overview.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CollectionsOverviewComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CollectionsOverviewModule { }

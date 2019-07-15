import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionComponent } from './collection.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';

@NgModule({
  declarations: [CollectionComponent],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbsModule
  ]
})
export class CollectionModule { }

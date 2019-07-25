import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionComponent } from './collection.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

@NgModule({
  declarations: [CollectionComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
})
export class CollectionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionComponent } from './collection.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CollectionComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CollectionModule { }

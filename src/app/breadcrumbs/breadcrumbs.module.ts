import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbsService } from './breadcrumbs.service';

@NgModule({
  declarations: [BreadcrumbsComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [BreadcrumbsComponent],
  providers: [BreadcrumbsService]
})
export class BreadcrumbsModule { }

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Breadcrumb } from 'src/models/breadcrumb.model';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  private readonly _breadcrumbsSubject = new Subject<Breadcrumb>();


  constructor() { }
}

import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationEnd,
  ActivatedRoute,
  PRIMARY_OUTLET,
  ActivationEnd
} from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const navigationEnd$ = this._router.events.pipe(filter((event => event instanceof NavigationEnd)));

    // this._router.events
    //   .pipe(
    //     filter(event => event instanceof ActivationEnd),
    //     map((event: Activation) => {
    //       // return event.;
    //     })
    //   )
    //   .subscribe(() => {});
  }
}

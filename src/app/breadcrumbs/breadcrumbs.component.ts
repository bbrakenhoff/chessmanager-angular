import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationEnd,
  ActivationEnd,
  ActivatedRouteSnapshot
} from '@angular/router';
import { filter, map, pluck, buffer, flatMap } from 'rxjs/operators';
import { Breadcrumb } from 'src/models/breadcrumb.model';
import { RouteId } from '../app-routing.module';
import { StorageService } from '../core/storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(
    private _router: Router,
    private _storageService: StorageService
  ) {}

  ngOnInit() {
    const navigationEnd$ = this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    );

    this.breadcrumbs$ = this._router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      pluck('snapshot'),
      buffer(navigationEnd$),
      flatMap(snapshot => snapshot),
      map((snapshot: ActivatedRouteSnapshot) => {
        const value: any = { routeId: snapshot.data.routeId };
        if (snapshot.params) {
          if (snapshot.params.collectionId) {
            value.collection = this._storageService.getCollectionById(
              snapshot.params.collectionId
            );
          }

          if (snapshot.params.fenDiagramId) {
            value.fenDiagram = this._storageService.getFenDiagramById(
              snapshot.params.fenDiagramId
            );
            value.collection = this._storageService.getCollectionById(
              value.fenDiagram.collectionId
            );
          }
        }

        return value;
      }),
      map(routeInfo => {
        const breadcrumbs: Breadcrumb[] = [];

        // Settings breadcrumb
        if (routeInfo.routeId === RouteId.Settings) {
          breadcrumbs.push(Breadcrumb.create('Settings', '/settings'));

          return breadcrumbs;
        }

        // Collections overview breadcrumb
        breadcrumbs.push(
          Breadcrumb.create('Collection overview', '/collections-overview')
        );

        if (routeInfo.routeId === RouteId.CollectionsOverview) {
          return breadcrumbs;
        }

        // Collection breadcrumb
        breadcrumbs.push(
          Breadcrumb.create(
            routeInfo.collection.name,
            '/collection',
            routeInfo.collection.id
          )
        );

        if (routeInfo.routeId === RouteId.Collection) {
          return breadcrumbs;
        }

        // Fen diagram breadcrumb
        breadcrumbs.push(
          Breadcrumb.create(
            routeInfo.fenDiagram.description,
            '/fen-diagram',
            routeInfo.fenDiagram.id
          )
        );

        return breadcrumbs;
      })
    );
  }
}

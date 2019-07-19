import { NgModule } from '@angular/core';
import { Routes, RouterModule, PRIMARY_OUTLET } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { SettingsModule } from './settings/settings.module';
import { FenDiagramComponent } from './fen-diagram/fen-diagram.component';
import { FenDiagramModule } from './fen-diagram/fen-diagram.module';
import { CollectionsOverviewComponent } from './collections-overview/collections-overview.component';
import { CollectionsOverviewModule } from './collections-overview/collections-overview.module';
import { CollectionModule } from './collection/collection.module';
import { CollectionComponent } from './collection/collection.component';

export enum RouteId {
  Settings = 'Settings',
  CollectionsOverview = 'CollectionsOverview',
  Collection = 'Collection',
  FenDiagram = 'FenDiagram'
}

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    data: {
      routeId: RouteId.Settings
    }
  },
  {
    path: 'collections-overview',
    component: CollectionsOverviewComponent,
    data: {
      routeId: RouteId.CollectionsOverview
    }
  },
  {
    path: 'collection/:collectionId',
    component: CollectionComponent,
    data: {
      routeId: RouteId.Collection
    }
  },
  {
    path: 'fen-diagram/:fenDiagramId',
    component: FenDiagramComponent,
    data: {
      routeId: RouteId.FenDiagram
    }
  },
  { path: '', redirectTo: '/collections-overview', pathMatch: 'full' }
];

@NgModule({
  imports: [
    SettingsModule,
    CollectionsOverviewModule,
    CollectionModule,
    FenDiagramModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

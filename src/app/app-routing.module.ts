import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { SettingsModule } from './settings/settings.module';
import { FenPositionComponent } from './fen-position/fen-position.component';
import { FenPositionModule } from './fen-position/fen-position.module';
import { CollectionsOverviewComponent } from './collections-overview/collections-overview.component';
import { CollectionsOverviewModule } from './collections-overview/collections-overview.module';
import { CollectionModule } from './collection/collection.module';
import { CollectionComponent } from './collection/collection.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'fenposition', component: FenPositionComponent },
  {
    path: 'collections',
    component: CollectionsOverviewComponent
  },
  {
    path: 'collections/:collectionId',
    component: CollectionComponent,
    children: [
      {
        path: 'fen-position/:fenPositionId',
        component: FenPositionComponent
      }
    ]
  },
  { path: '', redirectTo: '/collections', pathMatch: 'full' }
];

@NgModule({
  imports: [
    SettingsModule,
    CollectionsOverviewModule,
    CollectionModule,
    FenPositionModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

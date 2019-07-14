import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { SettingsModule } from './settings/settings.module';
import { FenDiagramComponent } from './fen-diagram/fen-diagram.component';
import { FenDiagramModule } from './fen-diagram/fen-diagram.module';
import { CollectionsOverviewComponent } from './collections-overview/collections-overview.component';
import { CollectionsOverviewModule } from './collections-overview/collections-overview.module';
import { CollectionModule } from './collection/collection.module';
import { CollectionComponent } from './collection/collection.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'collections', component: CollectionsOverviewComponent },
  { path: 'collections/:collectionId', component: CollectionComponent },
  {
    path: 'collections/:collectionId/fen-diagram/:fenDiagramId',
    component: FenDiagramComponent
  },
  { path: '', redirectTo: '/collections', pathMatch: 'full' }
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

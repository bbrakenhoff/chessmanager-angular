import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { SettingsModule } from './settings/settings.module';
import { FenPositionComponent } from './fen-position/fen-position.component';
import { FenPositionModule } from './fen-position/fen-position.module';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionsModule } from './collections/collections.module';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'fenposition', component: FenPositionComponent },
  { path: '', component: CollectionsComponent }
];

@NgModule({
  imports: [SettingsModule, CollectionsModule, FenPositionModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

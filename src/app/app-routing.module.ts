import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { SettingsModule } from './settings/settings.module';
import { FenPositionComponent } from './fen-position/fen-position.component';
import { FenPositionModule } from './fen-position/fen-position.module';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: '', component: FenPositionComponent }
];

@NgModule({
  imports: [SettingsModule, FenPositionModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

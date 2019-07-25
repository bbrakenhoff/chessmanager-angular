import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { SettingsModule } from './settings/settings.module';
import { BreadcrumbsModule } from './breadcrumbs/breadcrumbs.module';
import { SharedComponentsModule } from './shared-components/shared-components.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedComponentsModule,
    NavbarModule,
    BreadcrumbsModule,
    SettingsModule
  ],
  exports: [SharedComponentsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

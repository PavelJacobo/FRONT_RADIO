import { PipesModule } from './pipes/pipes.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GuardsModule } from './guards/guards.module';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/es';
import localeFrExtra from '@angular/common/locales/extra/es';
registerLocaleData(localeFr, 'es', localeFrExtra);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PipesModule,
    GuardsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

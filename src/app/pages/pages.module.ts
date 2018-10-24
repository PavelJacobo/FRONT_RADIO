import { PagesRoutingModule } from './pages.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        PagesComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        PipesModule,
        SharedModule
     ],
    exports: [],
    providers: [],
})
export class PagesModule {}

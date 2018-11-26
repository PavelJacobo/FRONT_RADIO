import { PagesRoutingModule } from './pages.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ActividadesComponent } from './actividades/actividades.component';
import { ProgramlistComponent } from './programlist/programlist.component';



@NgModule({
    declarations: [
        PagesComponent,
        HomeComponent,
        ActividadesComponent,
        ProgramlistComponent,
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        SharedModule
     ],
    exports: [],
    providers: [],
})
export class PagesModule {}

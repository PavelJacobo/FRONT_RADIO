import { PagesRoutingModule } from './pages.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { ActividadesComponent } from './actividades/actividades.component';
import { DirectiveModule } from '../directives/directive.module';



@NgModule({
    declarations: [
        PagesComponent,
        HomeComponent,
        ActividadesComponent,
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        PipesModule,
        SharedModule,
        DirectiveModule
     ],
    exports: [],
    providers: [],
})
export class PagesModule {}

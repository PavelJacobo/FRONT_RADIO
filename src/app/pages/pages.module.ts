import { PagesRoutingModule } from './pages.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';

@NgModule({
    declarations: [
        PagesComponent
    ],
    imports: [
        CommonModule,
        PagesRoutingModule
     ],
    exports: [],
    providers: [],
})
export class PagesModule {}

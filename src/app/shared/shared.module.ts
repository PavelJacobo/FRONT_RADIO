import { PipesModule } from './../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { NavPageModuleComponent } from './nav-page-module/nav-page-module.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { DetallePublicoNoticiaComponent } from '../sharedcomponents/detalle-publico-noticia/detalle-publico-noticia.component';


@NgModule({
  declarations: [
    BreadcrumbComponent,
    FooterComponent,
    NavPageModuleComponent,
    SidebarComponent,
    NavbarComponent,
    DetallePublicoNoticiaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ],
  exports: [
    BreadcrumbComponent,
    FooterComponent,
    NavPageModuleComponent,
    SidebarComponent,
    NavbarComponent
  ]
})
export class SharedModule { }

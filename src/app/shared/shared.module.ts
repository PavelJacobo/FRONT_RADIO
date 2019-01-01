import { PipesModule } from './../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { NavPageModuleComponent } from './nav-page-module/nav-page-module.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { DetallePublicoNoticiaComponent } from './detalle-publico-noticia/detalle-publico-noticia.component';
import { DetallePublicoProgramaComponent } from './detalle-publico-programa/detalle-publico-programa.component';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { RadioComponent } from './radio/radio.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { DetallePublicoUserComponent } from './detalle-publico-user/detalle-publico-user.component';
@NgModule({
  declarations: [
    BreadcrumbComponent,
    FooterComponent,
    NavPageModuleComponent,
    SidebarComponent,
    NavbarComponent,
    DetallePublicoNoticiaComponent,
    RadioComponent,
    ProgramacionComponent,
    DetallePublicoProgramaComponent,
    DetallePublicoUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    DirectiveModule
  ],
  exports: [
    BreadcrumbComponent,
    FooterComponent,
    NavPageModuleComponent,
    SidebarComponent,
    NavbarComponent,
    RadioComponent,
    ProgramacionComponent,
    DetallePublicoNoticiaComponent,
    DetallePublicoProgramaComponent,
    DetallePublicoUserComponent,
    PipesModule,
    DirectiveModule
  ]
})
export class SharedModule { }

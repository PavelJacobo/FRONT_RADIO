import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.components';
import { AdminRoutingModule } from './admin-routing.module';

// Shared Components
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';

// Custom Components
import { NoticiasComponent } from './noticias/noticias.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { PerfilProgramaComponent } from './perfil-programa/perfil-programa.component';
import { OcupacionLocalComponent } from './ocupacion-local/ocupacion-local.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionProgramasComponent } from './gestion-programas/gestion-programas.component';

// Custom Module
import { PipesModule } from '../pipes/pipes.module';

// Directives
import { DirectiveModule } from '../directives/directive.module';

// Forms Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Module
import { AngularMaterialModule } from '../angular-material.module';

// Editor

import { NgxWigModule } from 'ngx-wig';
import { MisNoticiasComponent } from './noticias/mis-noticias.component';

@NgModule({
    declarations: [
        AdminComponent,
        SidebarComponent,
        NavbarComponent,
        FooterComponent,
        BreadcrumbComponent,
        NoticiasComponent,
        PerfilUsuarioComponent,
        PerfilProgramaComponent,
        OcupacionLocalComponent,
        ProgramacionComponent,
        DashboardComponent,
        GestionProgramasComponent,
        MisNoticiasComponent
    ],
    imports: [
         CommonModule,
         AdminRoutingModule,
         DirectiveModule,
         FormsModule,
         ReactiveFormsModule,
         AngularMaterialModule,
         PipesModule,
         NgxWigModule
         ],
    exports: [],
    providers: [],
})
export class AdminModule {}

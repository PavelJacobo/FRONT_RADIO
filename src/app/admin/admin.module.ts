import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.components';
import { AdminRoutingModule } from './admin-routing.module';

// Shared Components
import { SharedModule } from '../shared/shared.module';


// Custom Components
import { NoticiasComponent } from './noticias/noticias.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { PerfilProgramaComponent } from './perfil-programa/perfil-programa.component';
import { OcupacionLocalComponent } from './ocupacion-local/ocupacion-local.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionProgramasComponent } from './gestion-programas/gestion-programas.component';
import { MisNoticiasComponent } from './noticias/mis-noticias.component';
import { DetalleNoticiaComponent } from './noticias/detalle-noticia.component';

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

// FROALA
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


// Shared Components Module
import { SharedComponentsModule } from '../sharedcomponents/shared.components.module';


@NgModule({
    declarations: [
        AdminComponent,
        NoticiasComponent,
        PerfilUsuarioComponent,
        PerfilProgramaComponent,
        OcupacionLocalComponent,
        DashboardComponent,
        GestionProgramasComponent,
        MisNoticiasComponent,
        DetalleNoticiaComponent
    ],
    imports: [
         CommonModule,
         AdminRoutingModule,
         DirectiveModule,
         FormsModule,
         ReactiveFormsModule,
         AngularMaterialModule,
         PipesModule,
         NgxWigModule,
         SharedModule,
         SharedComponentsModule,
         FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
         ],
    exports: [],
    providers: [],
})
export class AdminModule {}

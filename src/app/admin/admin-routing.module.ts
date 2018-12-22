import { AdminComponent } from './admin.components';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoticiasComponent } from './noticias/noticias.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { OcupacionLocalComponent } from './ocupacion-local/ocupacion-local.component';
import { PerfilProgramaComponent } from './perfil-programa/perfil-programa.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MisNoticiasComponent } from './noticias/mis-noticias.component';
import { DetalleNoticiaComponent } from './noticias/detalle-noticia.component';
import { ProgramacionComponent } from '../shared/programacion/programacion.component';
import { GestionWebComponent } from './gestion-web/gestion-web.component';
import { AdminGuard } from '../guards/admin.guard';
import { VerificaTokenGuard } from '../guards/verifica-token.guard';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: DashboardComponent,
                data: { titulo: 'Dashboard'}
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [VerificaTokenGuard],
                data: { titulo: 'Dashboard'}
            },
            {
                path: 'noticias',
                component: NoticiasComponent,
                data: { titulo: 'Noticias'}
             },
            {
                path: 'perfil',
                component: PerfilUsuarioComponent,
                data: { titulo: 'Perfil Usuario'}
            },
            {
                path: 'perfil_programa',
                component: PerfilProgramaComponent,
                data: { titulo: 'Perfil Programa'}
            },
            {
                path: 'mis_noticias',
                component: MisNoticiasComponent,
                data: { titulo: 'Mis Noticias'}
            },
            {
                path: 'detalle_noticia/:id',
                component: DetalleNoticiaComponent,
                data: { titulo: 'Mi Noticia'}
            },
            {
                path: 'ocupacion',
                component: OcupacionLocalComponent,
                data: { titulo: 'Reservar Local'}
            },
            {
                path: 'programacion',
                component: ProgramacionComponent,
                data: { titulo: 'Programación'}
            },
            {
                path: 'gestion_web',
                component: GestionWebComponent,
                data: { titulo: 'Gestion de la Aplicación'},
                canActivate: [AdminGuard]
            },
            {
                path: '**',
                component: DashboardComponent,
                data: { titulo: 'Dashboard'}
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}

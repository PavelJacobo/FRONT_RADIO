import { AdminComponent } from './admin.components';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoticiasComponent } from './noticias/noticias.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { OcupacionLocalComponent } from './ocupacion-local/ocupacion-local.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { PerfilProgramaComponent } from './perfil-programa/perfil-programa.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// const routes: Routes = [
//     { path: '', component: AdminComponent },
//     { path: '**', component: DashboardComponent },
//     { path: 'noticias', component: NoticiasComponent },
//     { path: 'perfil', component: PerfilUsuarioComponent },
//     { path: 'perfil_programa', component: PerfilProgramaComponent },
//     { path: 'programacion', component: ProgramacionComponent },
//     { path: 'reservar', component: OcupacionLocalComponent }
// ];
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
                path: 'ocupacion',
                component: OcupacionLocalComponent,
                data: { titulo: 'Reservar Local'}
            },
            {
                path: 'programacion',
                component: ProgramacionComponent,
                data: { titulo: 'Programación'}
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}

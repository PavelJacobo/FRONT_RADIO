import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ProgramacionComponent } from '../shared/programacion/programacion.component';
import { DetallePublicoNoticiaComponent } from '../shared/detalle-publico-noticia/detalle-publico-noticia.component';
import { DetallePublicoProgramaComponent } from '../shared/detalle-publico-programa/detalle-publico-programa.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
          {
            path: '',
            component: HomeComponent,
            data: { titulo: 'Home'}
          },
          {
            path: 'programas',
            component: ProgramacionComponent,
            data: { titulo: 'Programación'}
          },
          {
            path: 'actividades',
            component: ActividadesComponent,
            data: { titulo: 'Actividades'}
          },
          {
            path: 'evento/:id',
            component: DetallePublicoNoticiaComponent,
            data: { titulo: 'Evento'}
          },
          {
            path: 'programa/:id',
            component: DetallePublicoProgramaComponent,
            data: { titulo: 'Programa'}
          },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}

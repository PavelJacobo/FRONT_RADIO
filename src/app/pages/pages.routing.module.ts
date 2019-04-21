import { ProgramlistComponent } from './programlist/programlist.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { DetallePublicoNoticiaComponent } from '../shared/detalle-publico-noticia/detalle-publico-noticia.component';
import { DetallePublicoProgramaComponent } from '../shared/detalle-publico-programa/detalle-publico-programa.component';
import { RedondaComponent } from './redonda/redonda.component';
import { DetallePublicoUserComponent } from '../shared/detalle-publico-user/detalle-publico-user.component';
import { AboutComponent } from './about/about.component';


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
            component: ProgramlistComponent,
            data: { titulo: 'Programación'}
          },
          {
            path: 'actividades',
            component: ActividadesComponent,
            data: { titulo: 'Actividades'}
          },
          {
            path: 'redonda',
            component: RedondaComponent,
            data: { titulo: 'Redonda'}
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
          {
            path: 'usuario/:id',
            component: DetallePublicoUserComponent,
            data: { titulo: 'Usuario'}
          },
          {
            path: 'about',
            component: AboutComponent,
            data: { titulo: 'Sobre Nosotros'}
          }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}

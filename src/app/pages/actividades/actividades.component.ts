import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/modelos/noticia.modelo';
import { NoticiaService } from '../../services/admin/noticia.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  public actividades: Noticia[];
  constructor( public _noticiaService: NoticiaService) {
    this.getNoticias();
   }

  ngOnInit() {
  }

  getNoticias() {
    this._noticiaService.getNoticias('actividad').subscribe((noticias: any) => {
      this.actividades = noticias;
      console.log(this.actividades);
    });
  }

}

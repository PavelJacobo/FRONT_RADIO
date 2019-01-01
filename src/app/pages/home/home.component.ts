import { NoticiaService } from './../../services/admin/noticia.service';
import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/modelos/noticia.modelo';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public noticias: Noticia[];
  public noticiasDeOpinion: Noticia[];
  public actividades: Noticia[];

  constructor( public _noticiaService: NoticiaService) {
    this.getNoticias();
    this.getOpiniones();
    this.getDeInteres();
   }

  ngOnInit() {
  }

  getNoticias() {
    this._noticiaService.getNoticias('noticia').subscribe((noticias: any) => {
      this.noticias = noticias;
      console.log(this.noticias);
    });
  }

  getOpiniones() {
    this._noticiaService.getNoticias('opinion').subscribe((noticiasDeOpinion: any) => {
      this.noticiasDeOpinion = noticiasDeOpinion;
      console.log(this.noticiasDeOpinion);
    });
  }

  getDeInteres() {
    this._noticiaService.getNoticias('actividad').subscribe((actividades: any) => {
      this.actividades = actividades;
      console.log(this.actividades);
    });
  }

}

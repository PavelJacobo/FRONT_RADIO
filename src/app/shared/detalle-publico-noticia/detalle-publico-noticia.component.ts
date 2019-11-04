import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiaService } from '../../services/admin/noticia.service';
import { Noticia } from '../../modelos/noticia.modelo';

@Component({
  selector: 'app-detalle-publico-noticia',
  templateUrl: './detalle-publico-noticia.component.html',
  styleUrls: ['./detalle-publico-noticia.component.css']
})
export class DetallePublicoNoticiaComponent implements OnInit {
  public eventId: string;
  public event: Noticia;
  public otrosEventos: Noticia[];
  constructor(private _route: ActivatedRoute,
              private _noticiaService: NoticiaService, public router: Router) {
                this.eventId = this._route.snapshot.params['id'];
                // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                this.getEvento();
              }

  ngOnInit() {
    // console.log(this.eventId);
  }

  getEvento() {
    this._noticiaService.getNoticiaById(this.eventId).subscribe((evento: any) => {
      this.event = evento;
      window.scroll(0, 0);
      this._noticiaService.getNoticias(this.event.categoria).subscribe((otrosEventos: any) => {
        this.otrosEventos = otrosEventos;
      });
    });
  }

  getThisEvento = (eventoId) => {
    console.log(eventoId);
    this.eventId = eventoId;
    this.getEvento();
  }


}

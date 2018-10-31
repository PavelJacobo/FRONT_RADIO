import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
              private _noticiaService: NoticiaService) {
                this.eventId = this._route.snapshot.params['id'];
              }

  ngOnInit() {
    this.getEvento();
  }

  getEvento() {
    this._noticiaService.getNoticiaById(this.eventId).subscribe((evento: any) => {
      this.event = evento;
      this._noticiaService.getNoticias(this.event.categoria).subscribe((otrosEventos: any) => {
        this.otrosEventos = otrosEventos;
      });
    });
  }

  getThisEvento(eventoId) {
    this.eventId = eventoId;
    this.getEvento();
    document.body.scroll(1, 1);
    console.log(document.body.scroll);
  }

}

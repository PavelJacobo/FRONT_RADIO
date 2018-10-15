import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiaService } from 'src/app/services/admin/noticia.service';
import { Noticia } from 'src/app/modelos/noticia.modelo';

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.component.html',
  styles: []
})
export class DetalleNoticiaComponent implements OnInit {
  public id: string;
  public noticia: Noticia;
  constructor(public _route: ActivatedRoute, public _noticiaService: NoticiaService) {
    this.id = this._route.snapshot.params['id'];
  }

  ngOnInit() {
    this._noticiaService.getNoticiaById(this.id).subscribe((noticia: any) => {
      this.noticia = noticia;
      console.log(this.noticia);
    });
  }

}

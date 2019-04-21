import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { NoticiaService } from 'src/app/services/admin/noticia.service';
import { Noticia } from 'src/app/modelos/noticia.modelo';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styles: []
})
export class AboutComponent implements OnInit {
  public actividades: Noticia[];
  constructor(
    public _adminService: AdminService,
    public _noticiaService: NoticiaService
  ) { }

  ngOnInit() {
    this.getNoticias();
  }

  getNoticias() {
    this._noticiaService.getNoticias('nosotros').subscribe((noticias: any) => {
      this.actividades = noticias;
      // console.log(this.actividades, 'ACTIVIDADES');
    });
  }

}

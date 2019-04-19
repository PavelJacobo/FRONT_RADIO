import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { NoticiaService } from 'src/app/services/admin/noticia.service';
import { Noticia } from 'src/app/modelos/noticia.modelo';
@Component({
  selector: 'app-redonda',
  templateUrl: './redonda.component.html',
  styleUrls: ['./redonda.component.css']
})
export class RedondaComponent implements OnInit {
 public files: any;
 public actividades: Noticia[];
 public hasta: Date;
  constructor(
    public _adminService: AdminService,
    public _noticiaService: NoticiaService
  ) {
    this.hasta = new Date();
  }

  ngOnInit() {
    this.getFiles();
    this.getNoticias();
  }

  getFiles() {
  this._adminService.downloadFiles().subscribe((res: any) => {
    // console.log(res, 'RES');
    this.files = res;
    });
  }

  getNoticias() {
    this._noticiaService.getNoticias('redonda').subscribe((noticias: any) => {
      this.actividades = noticias;
      // console.log(this.actividades, 'ACTIVIDADES');
    });
  }

}

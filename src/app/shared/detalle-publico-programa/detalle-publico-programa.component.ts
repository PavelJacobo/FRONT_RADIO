import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Programa } from '../../modelos/modelo.index';
import { ProgramaService } from '../../services/admin/programa.service';
@Component({
  selector: 'app-detalle-publico-programa',
  templateUrl: './detalle-publico-programa.component.html',
  styleUrls: ['./detalle-publico-programa.component.css']
})
export class DetallePublicoProgramaComponent implements OnInit {
  public programId: string;
  public programa: Programa;
  constructor(private _route: ActivatedRoute,
              private _programaService: ProgramaService) {
    this.programId = this._route.snapshot.params['id'];
   }

  ngOnInit() {
    this._programaService.findPrograma(this.programId).subscribe((programa: any) => {
      this.programa = programa.programa;
      // console.log(this.programa);

      if (this.programa.fecha[1]) {
        for (let dia = 0; dia <= this.programa.fecha[1].dia.length; dia++) {
          switch (this.programa.fecha[1].dia[dia]) {
            case 0:
            this.programa.fecha[1].dia[dia] = 'Domingo';
            break;
            case 1:
            this.programa.fecha[1].dia[dia] = 'Lunes';
            break;
            case 2:
            this.programa.fecha[1].dia[dia] = 'Martes';
            break;
            case 3:
            this.programa.fecha[1].dia[dia] = 'Miercoles';
            break;
            case 4:
            this.programa.fecha[1].dia[dia] = 'Jueves';
            break;
            case 5:
            this.programa.fecha[1].dia[dia] = 'Viernes';
            break;
            case 6:
            this.programa.fecha[1].dia[dia] = 'Sábados';
            break;
          }
        }

      }

      for (let dia = 0; dia <= this.programa.fecha[0].dia.length; dia++) {
        switch (this.programa.fecha[0].dia[dia]) {
          case 0:
          this.programa.fecha[0].dia[dia] = 'Domingo';
          break;
          case 1:
          this.programa.fecha[0].dia[dia] = 'Lunes';
          break;
          case 2:
          this.programa.fecha[0].dia[dia] = 'Martes';
          break;
          case 3:
          this.programa.fecha[0].dia[dia] = 'Miercoles';
          break;
          case 4:
          this.programa.fecha[0].dia[dia] = 'Jueves';
          break;
          case 5:
          this.programa.fecha[0].dia[dia] = 'Viernes';
          break;
          case 6:
          this.programa.fecha[0].dia[dia] = 'Sábados';
          break;
        }
      }
    });
  }

}

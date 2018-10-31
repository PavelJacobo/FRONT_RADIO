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
      console.log(this.programa);
    });
  }

}

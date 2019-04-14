import { Component, OnInit } from '@angular/core';
import { NoticiaService } from 'src/app/services/admin/noticia.service';
import { Noticia } from 'src/app/modelos/noticia.modelo';
import { Chart } from 'chart.js';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Usuario } from 'src/app/modelos/modelo.index';
import { UsuarioService } from 'src/app/services/admin/usuario.service';
import { ProgramaService } from 'src/app/services/admin/programa.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 public noticiasNoticia: Noticia[];
 public noticiasActividad: Noticia[];
 public noticiasOpinion: Noticia[];
 public totalUsuarios;
 public totalNoticias;
 public totalProgramas;
 public pipechart =  [];
 // Pie
 public pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'top',
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        const label = ctx.chart.data.labels[ctx.dataIndex];
        return label;
      },
    },
  }
};

public pieChartColors = [
  {
    backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
  },
];
public pieChartLabels: Label[] = ['Noticias', 'Actividades', 'Opinión'];
public pieChartData: number[] = [];
public pieChartLabelsU: Label[] = ['Programas', 'Usuarios', 'Publicaciones'];
public pieChartDataU: number[] = [];
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
  constructor(public _noticiasService: NoticiaService, public _usuarioService: UsuarioService, public _programaService: ProgramaService ) {
    this._noticiasService.getNoticias('noticia', '0').subscribe((noticias: Noticia[]) => {
      this.noticiasNoticia = noticias;
      this.pieChartData.splice(0, 0, this.noticiasNoticia.length);
    });

    this._noticiasService.getNoticias('actividad', '0').subscribe((noticias: Noticia[]) => {
      this.noticiasActividad = noticias;
      this.pieChartData.splice(1, 0, this.noticiasActividad.length);
    });

    this._noticiasService.getNoticias('opinion', '0').subscribe((noticias: Noticia[]) => {
      this.noticiasOpinion = noticias;
      this.pieChartData.splice(2, 0, this.noticiasOpinion.length);
    });

    this._programaService.getTotalProgramas().subscribe((totalProgramas: any) => {
      this.totalProgramas = totalProgramas;
      this.pieChartDataU.splice(0, 0, totalProgramas);
    });

    this._usuarioService.getTotalUsers().subscribe((totalUsuarios: any) => {
      this.totalUsuarios = totalUsuarios;
      this.pieChartDataU.splice(1, 0, this.totalUsuarios);
      this.pieChartDataU.splice(2, 0, this.noticiasActividad.length + this.noticiasNoticia.length + this.noticiasOpinion.length);

    });
   }

  ngOnInit() {}

 // events
 public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}


}

import { Component, OnInit } from '@angular/core';
import { Programa, Evento } from '../../../modelos/modelo.index';
import { ProgramaService } from '../../../services/admin/programa.service';
import { Fecha } from '../../../interfaces/fecha.interface';

@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.css']
})
export class ProgramacionComponent implements OnInit {

  public calendarOptions: any;
  public programas: Programa[];
  public eventos: Evento[] = [];
  public colors: Array<string> = ['#29BAF9', '#29F9C4', '#F99E29'];
  constructor(public _programaService: ProgramaService) {
    if (this._programaService.programas) {
      this._programaService.programas.map((res: Programa) => {
        if (res.fecha.length > 0) {
          res.fecha.forEach((obj: Fecha) => {
            const eve = new Evento(
              res.nombre,
              obj.horaInicio,
              obj.horaFin,
              res._id,
              obj.dia,
              this.colors[Math.floor(Math.random() * this.colors.length)],
              '#/perfil_publico_programas/' + res._id
            );
            this.eventos.push(eve);
          });
        }
      });
    }
      console.log(this.eventos);

  }

  ngOnInit() {
    this.calendarOptions = {
      header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay',
      },
      buttonText: {
        today:    'hoy',
        month:    'mes',
        week:     'semana',
        day:      'día',
        list:     'lista'
      },
      allDayText: 'el día',
      timeFormat: 'HH:mm',
      slotLabelFormat: 'HH:mm',
      defaultView: 'agendaWeek',
      locale: 'es',
      events: this.eventos
    };

  }


}

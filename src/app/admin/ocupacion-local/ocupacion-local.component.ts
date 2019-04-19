import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Evento } from '../../modelos/evento.modelo';
import { UsuarioService } from '../../services/admin/usuario.service';
import { FullcalendarDirective } from '../../directives/fullcalendar.directive';


@Component({
  selector: 'app-ocupacion-local',
  templateUrl: './ocupacion-local.component.html',
  styleUrls: ['./ocupacion-local.component.css']
})
export class OcupacionLocalComponent implements OnInit {

  @ViewChild( FullcalendarDirective) fullcalendarRef: FullcalendarDirective ;
  public calendarOptions: any;
  public fecha: any;
  public start: any;
  public end: any;
  public color: string;
  public eventos: Evento[] = [];



  constructor(public _usuarioService: UsuarioService) {
    this.color = '#6BA5C1';
    this._usuarioService.getEventos().subscribe(res => {
      this.eventos = res;
      // console.log(this.eventos);
      this.fullcalendarRef.renderEvents(this.eventos);
    });
  }

  ngOnInit() {

    this.calendarOptions = {
      header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay',
      },
      columnFormat: 'ddd D / MMM',
      buttonText: {
        today:    'hoy',
        month:    'mes',
        week:     'semana',
        day:      'día',
        list:     'lista'
      },
      editable: true,
      selectable: false,
      selectHelper: true,
      allDayText: 'el día',
      timeFormat: 'HH:mm',
      slotLabelFormat: 'HH:mm',
      defaultView: 'agendaWeek',
      locale: 'es',
      eventOverlap: false,
      eventDrop: (event, delta, revertFunc) => {
        if (event._userId !== this._usuarioService.usuario._id) {
          revertFunc();
        }
        this.updateEvent(event);
      },
      eventResize: (event, delta, revertFunc) => {
        if (event._userId !== this._usuarioService.usuario._id) {
          revertFunc();
        }

        this.updateEvent(event);
      },
      eventRender: (event, element) =>  {
        if (event._userId === this._usuarioService.usuario._id) {
          element.find('.fc-content').append('<div style="color:#AD1414;text-align:right;" >' +
          '<i id="eliminar" class="fa fa-window-close" aria-hidden="true"></i></div>');
        }
      },
      eventClick: (evento, jsEvent, view) => {
        if (jsEvent.target.id === 'eliminar') {
          if (confirm('Estás seguro que deseas eliminar esta reserva')) {
          this._usuarioService.removeEvento(evento._id).subscribe();
          this.fullcalendarRef.removeEvent(evento._id);
          } else {
            return;
          }
        }
      },
      events: this.eventos
    };

  }

  onSubmit( form: NgForm) {
    const myDate = new Date(form.value.fecha.toISOString());
    const MyDateString = myDate.getFullYear() + '-'
             + ('0' + (myDate.getMonth() + 1)).slice(-2) + '-'
             + ('0' + myDate.getDate()).slice(-2) ;
    form.value.start = MyDateString + ' ' + form.value.start;
    form.value.end = MyDateString + ' ' + form.value.end;

    const eventReserva = new Evento(
      this._usuarioService.usuario.nombre,
      form.value.start,
      form.value.end,
      this._usuarioService.usuario._id,
      null,
      this.color
    );

    this._usuarioService.guardarEvento(eventReserva).subscribe((evento) => {
      this.fullcalendarRef.renderEvent(evento);
      form.reset();
    });
  }

  updateEvent(event: any) {
    const evento = {
      start: event.start.format().replace('T', ' '),
      end : event.end.format().replace('T', ' '),
      _id: event._id
    };

    this._usuarioService.updateEvento(evento).subscribe();

  }


}

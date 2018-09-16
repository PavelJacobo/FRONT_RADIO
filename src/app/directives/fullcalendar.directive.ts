import { Directive, Input, AfterViewInit, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import 'fullcalendar';

@Directive({
  selector: '[appFullcalendar]'
})
export class FullcalendarDirective implements AfterViewInit  {

 @Input('config') config: object = {};
  public stick: boolean;
  constructor(private el: ElementRef) {
    console.log('Directiva llamada');
    this.stick = true;
  }

  ngAfterViewInit() {

    $(this.el.nativeElement).fullCalendar(this.config);
}

renderEvents(events) {
  $(this.el.nativeElement).fullCalendar('renderEvents', events, this.stick);
}

renderEvent(event) {
  $(this.el.nativeElement).fullCalendar('renderEvent', event, this.stick);
}

removeEvent(eventoId) {
  $(this.el.nativeElement).fullCalendar('removeEvents', eventoId);
}

}

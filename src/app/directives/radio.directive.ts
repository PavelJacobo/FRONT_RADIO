import { Directive,  Input, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import * as $ from 'jquery';
@Directive({
  selector: '[appRadio]'
})
export class RadioDirective {
  @Input() play: boolean;
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  playAudio() {
    if ( this.play ) {
      const audioPlayer = <HTMLVideoElement> document.getElementById('radio');
      audioPlayer.play();
      console.log('Play Activo');
    } else {
      const audioPlayer = <HTMLVideoElement> document.getElementById('radio');
      audioPlayer.pause();
      console.log('Pause Activo');
    }
  }

}

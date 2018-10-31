import { Component, OnInit, ViewChild } from '@angular/core';
import { RadioDirective } from '../../directives/radio.directive';
@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {
  @ViewChild( RadioDirective) radiostreaming: RadioDirective ;
  public play: boolean;
  constructor() {
    this.play = true;
   }

  ngOnInit() {
  }

  playPause() {
    this.play = !this.play;
    this.radiostreaming.playAudio();
  }

}

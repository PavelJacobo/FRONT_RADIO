import { Component, OnInit, ViewChild } from '@angular/core';
import { RadioDirective } from '../../directives/radio.directive';
import { Programa } from 'src/app/modelos/modelo.index';
import { ProgramaService } from 'src/app/services/admin/programa.service';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {
  @ViewChild( RadioDirective) radiostreaming: RadioDirective ;
  public play: boolean;
  public programas: Programa[];
  constructor( public _programaService: ProgramaService) {
    this.play = true;
   }

  ngOnInit() {
   this.getAllPrograms();
   this.getCurrentProgram();
  }

  playPause() {
    this.play = !this.play;
    this.radiostreaming.playAudio();
  }

  getAllPrograms() {
    this._programaService.obtenerProgramas().subscribe((programas) => {
      this.programas = programas;
      // console.log(programas);
    });
  }

  getCurrentProgram() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const Now = new Date().toLocaleDateString('es-ES', options);
    // console.log(Now);
  }

}

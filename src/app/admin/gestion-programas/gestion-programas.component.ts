import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Programa, Usuario } from '../../modelos/modelo.index';
import Swal from 'sweetalert2';
import { ProgramaService } from '../../services/admin/programa.service';
import { UsuarioService } from '../../services/admin/usuario.service';
import { Fecha } from '../../interfaces/fecha.interface';
import { MatSnackBar } from '@angular/material';



export interface Dias {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-gestion-programas',
  templateUrl: './gestion-programas.component.html',
  styles: [`
  .mat-chip-list-wrapper {
    height:26px !important;
  }
  `]
})
export class GestionProgramasComponent implements OnInit {

  nameCtrl: NgForm;

  dias: Dias[] = [
    {value: '1', viewValue: 'Lunes'},
    {value: '2', viewValue: 'Martes'},
    {value: '3', viewValue: 'Miércoles'},
    {value: '4', viewValue: 'Jueves'},
    {value: '5', viewValue: 'Viernes'},
    {value: '6', viewValue: 'Sábado'},
    {value: '0', viewValue: 'Domingo'},
  ];

  formaPrograma: FormGroup;
  @Input() public programa: Programa;
  @Input() public colaboradores: Usuario[];
  @Output()actualizar: EventEmitter<Programa> = new EventEmitter<Programa>();
  @Output()crear: EventEmitter<Programa> = new EventEmitter<Programa>();
  public imagenTemp: string | ArrayBuffer | null;
  public imagenSubir: File;
  cambiandoImagen: boolean;
  public fecha: Fecha;
  public fechas: Fecha[];
  public cancreate = false;
  constructor(
                public router: Router,
                public fb: FormBuilder,
                public _programaService: ProgramaService,
                public _usuarioService: UsuarioService,
                public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cambiandoImagen = true;
    this.fecha = {
      dia: [],
      horaInicio: '',
      horaFin: ''
    };

    this.fechas = [];
  }

  onSubmit(programa) {
  if (this.imagenSubir !== undefined) {
      this.cambiarImagen().then((res: any) => {
        this.programa.nombre = programa.nombre;
        this.programa.contenido = programa.contenido;
        this.programa.img = res.programa.img;
        this.programa.potcast = res.programa.potcast;
        this.programa.facebook = res.programa.facebook;
        this.programa.twitter = res.programa.twitter;
        console.log(this.programa);
        this.actualizar.emit(programa);
        this.imagenTemp = null;
      });
    } else {
      this.programa.nombre = programa.nombre;
      this.programa.contenido = programa.contenido;
      this.programa.potcast = programa.potcast;
        this.programa.facebook = programa.facebook;
        this.programa.twitter = programa.twitter;
      this.actualizar.emit(programa);
      console.log(this.programa);
      this.imagenTemp = null;
    }
  }

  seleccionImagen( archivo: File ) {
    this.cambiandoImagen = false;
    console.log(this.cambiandoImagen);
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      Swal('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {
    return this._programaService.cambiarImagen( this.imagenSubir, 'programa', this.programa._id);
  }

  subirImagen() {
    if (this.imagenSubir !== undefined) {
      return this._programaService.subirImagen(this.imagenSubir, 'programa');
    } else {
      console.log('La imagen no está definida');
      return;
    }
  }


  cancelar(f: NgForm, nameCtrl: NgForm) {
    if (f) {
      f.reset();
    } else {
      nameCtrl.reset();
    }
  this.programa = undefined;
  this.imagenTemp = null;
  this.colaboradores = undefined;
  this.fechas = [];
  console.log(this.programa);
  return;
  }

  readFecha(nameCtrl: NgForm) {
    nameCtrl.value.dia = nameCtrl.value.dia.map(Number);
    const fechaValue = {
      dia: nameCtrl.value.dia.map(Number),
      horaInicio: nameCtrl.value.horaInicio,
      horaFin: nameCtrl.value.horaFin
    };
    this.fechas.push(fechaValue);
    console.log(fechaValue);
    console.log(this.fechas);
  }

  readFechaPrograma(nameCtrl: NgForm) {
    // nameCtrl.value.dia = nameCtrl.value.dia.map(Number);
    const fechaValue = {
      dia: nameCtrl.value.dia.map(Number),
      horaInicio: nameCtrl.value.horaInicio,
      horaFin: nameCtrl.value.horaFin
    };
    this.programa.fecha.push(fechaValue);
    nameCtrl.reset();
  }

  eliminarFecha(index) {
    this.fechas.splice(index, 1);
  }
  eliminarFechaPrograma(index) {
    this.programa.fecha.splice(index, 1);
    console.log(this.programa.fecha);
  }

    crearPrograma(programa) {
      if (programa.contenido.length === 0) {
        Swal('error', 'Campo de descripción vacío', 'error');
        return 0;
      }
      if (this.imagenSubir !== undefined) {

      this.subirImagen().then((res: any) => {
        const prog = new Programa(
          programa.nombre,
          programa.contenido,
          [this._usuarioService.usuario._id],
          this.fechas,
          res.img,
          programa.potcast,
          programa.facebook,
          programa.twitter
        );
        console.log(prog, 'PROOOOOOOOOOOG');
        this.crear.emit(prog);
        this.imagenTemp = null;
        this.fechas = [];
        programa = null;
      }).catch((err) => console.log(err));
    } else {
      console.log('Imagen no definida');
      Swal('error', 'Imagen no definida', 'error');
      this.openSnackBar('Imagen no definida', 'Aceptar');
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

}

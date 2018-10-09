import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { UsuarioService } from '../../services/admin/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProgramaService } from 'src/app/services/admin/programa.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  forma: FormGroup;
  public imagenSubir: File;
  public imagenTemp: string | ArrayBuffer | null;
  constructor(public router: Router,
              public fb: FormBuilder,
              public _programaService: ProgramaService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.forma = this.fb.group({
      titulo: [ '', [
        Validators.required
      ]],
      resumen: [ '', [
        Validators.required
      ]],
      contenido: [ '', [
        Validators.required
      ]],
      tags: [ '', [
        Validators.required
      ]],
    });
  }

  onSubmit(value) {
    if (this.imagenSubir !== undefined) {

      this.subirImagen().then((res: any) => {

      }).catch((err) => console.log(err));
    } else {
      console.log('Imagen no definida');
      this.openSnackBar('Imagen no definida', 'Aceptar');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  seleccionImagen( archivo: File ) {
    console.log ( archivo );
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      Swal('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
      this.imagenSubir = null;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen() {
    if (this.imagenSubir !== undefined) {
      return this._programaService.subirImagen(this.imagenSubir);
    } else {
      console.log('La imagen no está definida');
      return;
    }
  }

}

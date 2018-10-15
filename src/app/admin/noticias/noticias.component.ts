import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { UsuarioService } from '../../services/admin/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProgramaService } from 'src/app/services/admin/programa.service';
import { MatSnackBar } from '@angular/material';
import { Noticia } from '../../modelos/noticia.modelo';
import { NoticiaService } from '../../services/admin/noticia.service';

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
              public _noticiaService: NoticiaService,
              public _usuarioService: UsuarioService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.forma = this.fb.group({
      titulo: [ '', [
        Validators.required
      ]],
      resume: [ '', [
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

  onSubmit(form) {
    const value = form.value;
    if (this.imagenSubir !== undefined) {

      this.subirImagen().then((res: any) => {
        const date = new Date();
        const _id = this._usuarioService.usuario._id;
        const noticia = new Noticia(value.titulo, value.resume, value.contenido, value.tags, res.img, _id, date );
        this._noticiaService.crearNoticia( noticia).subscribe((data) => {
          console.log('DATA', data);
        });
        form.reset();
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
      this.imagenSubir = null;
      return;
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

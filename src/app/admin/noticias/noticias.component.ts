import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { UsuarioService } from '../../services/admin/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProgramaService } from 'src/app/services/admin/programa.service';
import { MatSnackBar } from '@angular/material';
import { Noticia } from '../../modelos/noticia.modelo';
import { NoticiaService } from '../../services/admin/noticia.service';
// MATCHIPS
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';


export interface Categoria {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  public categorias: Categoria[] = [
    {value: 'noticia', viewValue: 'Noticia'},
    {value: 'actividad',  viewValue: 'Actividad'},
    {value: 'opinion', viewValue: 'Opinión'}
  ];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public forma: FormGroup;
  public imagenSubir: File;
  public imagenTemp: string | ArrayBuffer | null;
  public tagArray = [];
  constructor(public router: Router,
              public fb: FormBuilder,
              public _programaService: ProgramaService,
              public _noticiaService: NoticiaService,
              public _usuarioService: UsuarioService,
              public snackBar: MatSnackBar) {
                if ( this._usuarioService.usuario.role === 'ADMIN_ROLE') {
                  this.categorias.push({value: 'redonda', viewValue: 'Redonda'}, {value: 'nosotros', viewValue: 'Nosotros'});
                }
               }

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
      categoria: [ '', [
        Validators.required
      ]],
    });
  }

  onSubmit(form) {
    const value = form.value;
    // console.log(form);
    // console.log(value);
    if (value.contenido.length <= 0 || value.categoria === '') {
      this.openSnackBar('El cuerpo del evento no puede estar vacío y la categoría debe ser definida', 'Aceptar');
      return;
    }
     if (this.imagenSubir !== undefined) {

      this.subirImagen().then((res: any) => {
        const date = new Date();
        const _id = this._usuarioService.usuario._id;
        const noticia = new Noticia(value.titulo, value.resume, value.contenido, this.tagArray , value.categoria, res.img, _id, date );
        this._noticiaService.crearNoticia( noticia).subscribe((data) => {
          console.log('DATA', data);
        });
        form.reset();
        this.imagenTemp = null;
        this.tagArray = [];
      }).catch((err) => Swal('error', err, 'error'));
    } else {
      // console.log('Imagen no definida');
      this.openSnackBar('Imagen no definida', 'Aceptar');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  seleccionImagen( archivo: File ) {
    // console.log ( archivo );
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
      return this._programaService.subirImagen(this.imagenSubir, 'noticia');
    } else {
      // console.log('La imagen no está definida');
      return;
    }
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tagArray.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.tagArray.indexOf(tag);
    if (index >= 0) {
      this.tagArray.splice(index, 1);
    }
  }

}

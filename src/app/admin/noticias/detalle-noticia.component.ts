import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiaService } from 'src/app/services/admin/noticia.service';
import { Noticia } from 'src/app/modelos/noticia.modelo';
import { ProgramaService } from 'src/app/services/admin/programa.service';
import { FormGroup, FormBuilder, Validators, Form  } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material';

// MATCHIPS
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

export interface Categoria {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.component.html',
  styles: []
})
export class DetalleNoticiaComponent implements OnInit {

  public categorias: Categoria[] = [
    {value: 'noticia', viewValue: 'Noticia'},
    {value: 'actividad',  viewValue: 'Actividad'},
    {value: 'opinion', viewValue: 'Opinión'}
  ];

  public tagArray = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  public imagenSubir: File;
  public imagenTemp: string | ArrayBuffer | null;
  public id: string;
  public noticia: Noticia;
  public forma: FormGroup;
  public getContenido: string;
  public options: Object = {
    charCounterCount: false,
    height: 300,
    events : {
      'froalaEditor.focus' : function(e, editor) {
        // // console.log(editor.selection.get());
      }
    }
  };
  constructor(
            public _route: ActivatedRoute,
            public _noticiaService: NoticiaService,
            public fb: FormBuilder,
            public _programaService: ProgramaService,
            public snackBar: MatSnackBar
            ) {
    this.id = this._route.snapshot.params['id'];
  }

  ngOnInit() {
    this._noticiaService.getNoticiaById(this.id).subscribe((noticia: any) => {
      this.noticia = noticia;
      this.getContenido = noticia.contenido;
      this.forma.controls['titulo'].setValue(noticia.titulo);
      this.forma.controls['contenido'].setValue(noticia.contenido);
      this.forma.controls['resume'].setValue(noticia.resume);
      this.forma.controls['tags'].setValue(noticia.tags);
      this.forma.controls['categoria'].setValue(noticia.categoria);
      // // console.log(this.noticia);
    });

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
    // console.log(form.value);
    if (this.imagenSubir !== undefined) {

      this.subirImagen().then((res: any) => {
          this.noticia.img = res.img;
          this.noticia.titulo = this.forma.get('titulo').value;
          this.noticia.contenido = this.forma.get('contenido').value;
          this.noticia.resume = this.forma.get('resume').value;
          this._noticiaService.updateNoticia(this.noticia).subscribe((data: any) => {
                        // console.log(data);
          });
       // form.reset();
      }).catch((err) => Swal('error', err, 'error'));
    } else {

          this.noticia.titulo = this.forma.get('titulo').value;
          this.noticia.contenido = this.forma.get('contenido').value;
          this.noticia.resume = this.forma.get('resume').value;
         // console.log(this.noticia);
          this._noticiaService.updateNoticia(this.noticia).subscribe((data: any) => {
                       // console.log(data);
          });
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
      this.noticia.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.noticia.tags.indexOf(tag);
    if (index >= 0) {
      this.noticia.tags.splice(index, 1);
    }
  }


}

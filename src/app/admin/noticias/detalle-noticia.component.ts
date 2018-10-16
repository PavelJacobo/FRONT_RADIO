import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiaService } from 'src/app/services/admin/noticia.service';
import { Noticia } from 'src/app/modelos/noticia.modelo';
import { FormGroup, FormBuilder, Validators, Form  } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.component.html',
  styles: []
})
export class DetalleNoticiaComponent implements OnInit {
  public id: string;
  public noticia: Noticia;
  public forma: FormGroup;
  public getContenido: string;
  public options: Object = {
    charCounterCount: false,
    height: 300,
    events : {
      'froalaEditor.focus' : function(e, editor) {
        console.log(editor.selection.get());
      }
    }
  };
  constructor(
            public _route: ActivatedRoute,
            public _noticiaService: NoticiaService,
            public fb: FormBuilder,
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
      console.log(this.noticia);
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
      });


  }

  onSubmit(form) {
    console.log(form);
  }

}

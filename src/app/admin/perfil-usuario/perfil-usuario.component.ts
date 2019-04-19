import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators  } from '@angular/forms';
import { UsuarioService } from '../../services/admin/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../modelos/usuario.modelo';
import { AdminService } from '../../services/admin/admin.service';
import Swal from 'sweetalert2';
import { ProgramaService } from '../../services/admin/programa.service';

export interface DiasSemana {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  public forma: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imagenTemp: string | ArrayBuffer | null;
  public passwordEnabled: boolean ;
   constructor(  public router: Router,
                public fb: FormBuilder,
                public _usuarioService: UsuarioService,
                public _programaService: ProgramaService,
                public _adminService: AdminService) {
                  this.passwordEnabled = false;
                }

  ngOnInit() {

    this.usuario = this._usuarioService.usuario;

    this.forma = this.fb.group({
      programas: [this._usuarioService.usuario.programas],
      nombre: [this.usuario.nombre, [
        Validators.required
      ]],
      email: [ this._usuarioService.usuario.email, [
        Validators.required,
        Validators.email
      ]],
      password1: [''],
      password2: ['']
    });

  }
  // GETS Variables

    get nombre() {
      return this.forma.get('nombre');
    }

    get programas() {
      return this.forma.get('programas');
    }

    get email() {
      return this.forma.get('email');
    }
    get password1() {
      return this.forma.get('password1');
    }
    get password2() {
      return this.forma.get('password2');
    }

  onSubmit() {
    if (this.passwordEnabled && this.password1.value.length > 0) {
      // console.log(this.password1.value);
      // console.log(this.password2.value);
      if (this.password1.value !== this.password2.value) {
         window.alert('Las contraseñas no coinciden');
         return null;
      } else {
        this.usuario.password1 = this.password1.value;
        this.usuario.password2 = this.password2.value;
      }
    }
    this.usuario.nombre = this.nombre.value;
    this.usuario.email = this.email.value;
    this.usuario.programas = this.programas.value;
    this.cambiarImagen();
    this._usuarioService.updateUser(this.usuario)
                      .subscribe((res) => {
                        // console.log(this._usuarioService.usuario.programas);
                        this._usuarioService.loading = false;
                        this.programas.setValue(this._usuarioService.usuario.programas);
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

  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.imagenSubir, 'usuario', this.usuario._id);
  }

  compareWithFunc(a, b) {
    return a === b._id;
  }

  cancelar() {
    this.imagenTemp = null;
    this.router.navigate(['/home']);
  }

  enableChangePassword() {
  this.passwordEnabled = !this.passwordEnabled;
  if (!this.passwordEnabled) {
    this.password1.setValue(undefined);
    this.password2.setValue(undefined);
    this.usuario.password1 = undefined;
    this.usuario.password2 = undefined;
  }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
// import { UsuarioService } from '../services/admin/usuario.service';
import { LoginUsuario } from '../modelos/modelo.index';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/admin/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forma: FormGroup;
  public username: string;
  constructor(
               public router: Router,
               public fb: FormBuilder,
               public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('email') || '';
    this.forma = this.fb.group({
      email: [ this.username, [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]],
      recuerdame: false
    });

    if ( this.username.length > 1 ) {
      this.forma.get('recuerdame').setValue(true);
    }
  }


  get email() {
    return this.forma.get('email');
  }

  get password () {
    return this.forma.get('password');
  }

  get recuerdame () {
    return this.forma.get('recuerdame');
  }

  onSubmit() {
    const userToLogin = new LoginUsuario (
      this.forma.controls.email.value,
      this.forma.controls.password.value
    );

  // console.log('Recuerdame', this.recuerdame.value);
     this._usuarioService.login( userToLogin, this.recuerdame.value ).subscribe(correcto => this.router.navigate(['/admin']));
  }

}

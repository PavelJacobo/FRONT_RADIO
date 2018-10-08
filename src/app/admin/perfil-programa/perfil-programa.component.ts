import { Component, OnInit } from '@angular/core';
import { ProgramaService } from '../../services/admin/programa.service';
import { Programa, Usuario } from '../../modelos/modelo.index';
import { UsuarioService } from '../../services/admin/usuario.service';

@Component({
  selector: 'app-perfil-programa',
  templateUrl: './perfil-programa.component.html',
  styleUrls: ['./perfil-programa.component.css']
})
export class PerfilProgramaComponent implements OnInit {

  public programas: Programa[];
  public programasDeUsuario: Programa[];
  public usuario: Usuario;
  public programa: Programa;
  colaboradores: Array<any>;

  constructor(
    public _programaService: ProgramaService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.programas = this._programaService.programas;
    this.getProgramasDelUsuario();
   }

   getProgramasDelUsuario() {
     if (this.programas) {
      this.programasDeUsuario = this.programas.filter((programa) => {
        return programa.colaboradores.includes(this.usuario._id);
      });
     }
     console.log(this.programasDeUsuario);
   }

   datoAHijo( programa: Programa ) {
      this.programa = new Programa(
        programa.nombre,
        programa.contenido,
        programa.colaboradores,
        programa.fecha,
        programa.img,
        programa._id
      );
      this.findColaboradores(programa.colaboradores);
   }

   findColaboradores(colaboradores) {
    this._usuarioService.findUser(colaboradores)
    .subscribe((res) => {
                    console.log(res);
                    this.colaboradores = res;
    });
   }

   SubmitPrograma(programa: Programa) {

    this._programaService.updatePrograma(programa, this._usuarioService.token)
                             .subscribe((res: any) => {
                               console.log(res.programa);
                               this._programaService.optenerProgramas().subscribe(((resp: any ) => {
                                 console.log(resp);
                                 this.programas = resp.programas;
                                 this._programaService.programas = resp.programas;
                                 this.getProgramasDelUsuario();
                               }));
                             });
      }

      crearPrograma(programa: Programa) {
        this._programaService.crearPrograma(programa, this._usuarioService.token).subscribe((res: any) => {
            console.log('Respuesta del Servidor', res);
            this.usuario.programas.push(res.programa._id);
            this._usuarioService.setNewProgramToUser(res.programa._id, this.usuario._id).subscribe((resp: any) => {
                console.log(res);
            });
            console.log('Usuario', this.usuario);
            this._programaService.optenerProgramas().subscribe(((resp: any ) => {
            console.log(resp);
            this.programas = resp.programas;
            this._programaService.programas = resp.programas;
            this.getProgramasDelUsuario();
          }));
        });
      }

}

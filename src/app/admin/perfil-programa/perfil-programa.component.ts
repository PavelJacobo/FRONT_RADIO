import { Component, OnInit } from '@angular/core';
import { ProgramaService } from '../../services/admin/programa.service';
import { Programa, Usuario } from '../../modelos/modelo.index';
import { UsuarioService } from '../../services/admin/usuario.service';
import Swal from 'sweetalert2';
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
      if (this.programas) {
        // console.log(this.programas);
        this.getProgramasDelUsuario();
      }
   }

   getProgramasDelUsuario() {
      if (this.usuario.role === 'ADMIN_ROLE') {
        this.programasDeUsuario = this.programas;
      } else {
        this.programasDeUsuario = this.programas.filter((programa) => {
          // console.log(programa.colaboradores);
          return programa.colaboradores.includes(this.usuario._id);
        });
      //  console.log(this.programasDeUsuario);
      }
   }

   datoAHijo( programa: Programa ) {
      this.programa = new Programa(
        programa.nombre,
        programa.contenido,
        programa.colaboradores,
        programa.fecha,
        programa.img,
        programa.potcast,
        programa.facebook,
        programa.twitter,
        programa.instagram,
        programa._id
      );
      this.findColaboradores(programa.colaboradores);
   }

   findColaboradores(colaboradores) {
    this._usuarioService.findUser(colaboradores)
    .subscribe((res) => {
                    // console.log(res);
                    this.colaboradores = res;
    });
   }

   SubmitPrograma(programa: Programa) {
    this._programaService.updatePrograma(programa, this._usuarioService.token)
                             .subscribe((res: any) => {
                              //  console.log(res.programa);
                              Swal('Programa actualizado', 'programa actualizado correctamente', 'success');
                               this._programaService.obtenerProgramas().subscribe(((resp: any ) => {
                                //  console.log(resp);
                                 this.programas = resp;
                                 this._programaService.programas = resp;
                                 this.getProgramasDelUsuario();
                               }));
                             });
      }

      crearPrograma(programa: Programa) {
        this._programaService.crearPrograma(programa, this._usuarioService.token).subscribe((res: any) => {
            // console.log('Respuesta del Servidor', res);
            Swal('Nuevo Programa añadido', 'programa creado correctamente', 'success');
            this.usuario.programas.push(res.programa._id);
            this._usuarioService.setNewProgramToUser(res.programa._id, this.usuario._id).subscribe((resp: any) => {
                // console.log(res);
            });
            // console.log('Usuario', this.usuario);
            this._programaService.obtenerProgramas().subscribe(((resp: any ) => {
            // console.log(resp);
            this.programas = resp;
            this._programaService.programas = resp;
            this.getProgramasDelUsuario();
          }));
        });
      }


}

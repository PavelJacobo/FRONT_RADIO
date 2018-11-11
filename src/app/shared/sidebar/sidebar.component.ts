import { UsuarioService } from '../../services/admin/usuario.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { SidebarService } from '../../services/shared/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @HostBinding('class.is-open')
  isOpen = false;
  public showmenu: boolean;

  constructor( public _sidebar: SidebarService, private _usuarioService: UsuarioService) {
    this.showmenu = false;
  }

  ngOnInit() {
  }

  toggle() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }

  logOut() {
    this._usuarioService.logout();
  }

  showMenu(menu) {
    menu.showmenu = !menu.showmenu;
  }


}

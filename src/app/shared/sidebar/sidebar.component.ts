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

  constructor( public _sidebar: SidebarService) {}

  ngOnInit() {
  }

  toggle() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }


}

import { Component, OnInit, Input, HostListener } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() sideBar: SidebarComponent;

  click() {
    this.sideBar.toggle();
  }

  constructor(

  ) { }

  ngOnInit() {
  }


}

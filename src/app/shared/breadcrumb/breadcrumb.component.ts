import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  titulo: string;
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.titulo = 'Dashboard';
  }

  ngOnInit() {

    this.getDataRoute().subscribe(data => {
      this.titulo = data.titulo;
      this.title.setTitle(this.titulo);

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };

      this.meta.updateTag(metaTag);
    });
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }

}

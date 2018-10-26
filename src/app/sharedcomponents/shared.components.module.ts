import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramacionComponent } from './programacion/programacion.component';
import { RouterModule } from '@angular/router';
import { DirectiveModule } from 'src/app/directives/directive.module';

@NgModule({
  declarations: [
    ProgramacionComponent
  ],
  imports: [ CommonModule, RouterModule, DirectiveModule ],
  exports: [
    ProgramacionComponent
  ],
  providers: [],
})
export class SharedComponentsModule {}


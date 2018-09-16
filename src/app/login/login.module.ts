import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.modules';
// Forms Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule {}

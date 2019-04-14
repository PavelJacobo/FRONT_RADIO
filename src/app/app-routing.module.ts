import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
    { path: '', loadChildren: './pages/pages.module#PagesModule'},
    { path: 'login', loadChildren: './login/login.module#LoginModule'},
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [LoginGuard] }
    // { path: '', loadChildren: './pages/pages.module#PagesModule'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'top'})],
    exports: [RouterModule]
})

export class AppRoutingModule {}

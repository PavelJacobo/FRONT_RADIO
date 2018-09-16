import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', loadChildren: './pages/pages.module#PagesModule'},
    { path: 'login', loadChildren: './login/login.module#LoginModule'},
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule' }
    // { path: '', loadChildren: './pages/pages.module#PagesModule'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class AppRoutingModule {}

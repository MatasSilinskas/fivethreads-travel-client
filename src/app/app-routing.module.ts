import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
} from '@nebular/auth';
import { AuthGuard } from './@core/routeGuards/auth.guard.service';
import { LoginAuthGuard } from './@core/routeGuards/login.guard.service';

const routes: Routes = [
  { path: 'pages', canActivate: [AuthGuard], loadChildren: './pages/pages.module#PagesModule' },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
        canActivate: [LoginAuthGuard],
      },
      {
        path: 'login',
        component: NbLoginComponent,
        canActivate: [LoginAuthGuard],
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
    ],
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full', canActivate: [LoginAuthGuard] },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};
@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

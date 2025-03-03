import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { DashboardComponent } from './pantallas/dashboard/dashboard.component';
import { LoginComponent } from './pantallas/login/login.component';
import { LogoutComponent } from './pantallas/logout/logout.component';
import { PaisesComponent } from './pantallas/paises/paises.component';
import { ProvinciasComponent } from './pantallas/provincias/provincias.component';

export const routes: Routes = [
    {
      path: 'login',
      component: LoginComponent
    },
    {
    path: '',
    loadComponent: () => import('./components/layout/layout.component'),
    canActivate: [AuthGuard],
    children: [
          {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [AuthGuard]
          },
          { path: '',
            component: DashboardComponent,
            canActivate: [AuthGuard]
          },
          { path: 'paises',
              component: PaisesComponent,
              canActivate: [AuthGuard]
          },
          { path: 'provincias',
            component: ProvinciasComponent,
            canActivate: [AuthGuard]
          },
          { path: 'logout',
            component: LogoutComponent,
            canActivate: [AuthGuard]
          },    
          {
              path: '',
              redirectTo: 'dashboard',
              pathMatch: 'full'
          }

    ]
},
{
    path: '**',
    redirectTo: 'dashboard'
}
];
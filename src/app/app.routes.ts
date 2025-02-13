import { Routes } from '@angular/router';
import { DashboardComponent } from './pantallas/dashboard/dashboard.component';
import { PaisesComponent } from './pantallas/paises/paises.component';
import { ProvinciasComponent } from './pantallas/provincias/provincias.component';
import { LoginComponent } from './pantallas/login/login.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    {
      path: 'login',
      component: LoginComponent
    },
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
      component: ProvinciasComponent
    },
    { path: '**', redirectTo: 'login' }
];

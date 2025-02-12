import { Routes } from '@angular/router';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { PaisesComponent } from './pantallas/paises/paises.component';

export const routes: Routes = [
    { path: '', 
      component: DashboardComponent 
    },
    { path: 'paises', 
        component: PaisesComponent 
    },
    
    //{ path: 'trip/:id', component: TripDetailComponent },
    //{ path: 'booking/:tripId', component: BookingComponent }
];

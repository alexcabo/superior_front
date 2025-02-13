import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.loggedIn) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  // constructor(private authService: AuthService, private router: Router) {}

  // canActivate(): boolean {
  //   const isAuthenticated = !!this.authService.getToken(); // Verifica si hay un token

  //   if (!isAuthenticated) {
  //     // Si no está autenticado, redirige al login
  //     this.router.navigate(['/login']);
  //   }
  //   return isAuthenticated; // Permite el acceso solo si está autenticado
  // }
}

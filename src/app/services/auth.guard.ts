import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = !!this.authService.getToken(); // Verifica si hay un token

    if (!isAuthenticated) {
      // Si no está autenticado, redirige al login
      this.router.navigate(['/login']);
    }
    return isAuthenticated; // Permite el acceso solo si está autenticado
  }
}

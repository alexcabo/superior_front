import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
      if (this.authService.loggedIn) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}


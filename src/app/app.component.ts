import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SideNavBarComponent,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hache Viajes y Servicios';
  //loggedIn = Observable<boolean>;
  loggedIn$ = false;

  constructor(authService: AuthService) {
     this.loggedIn$ = authService.loggedIn
  }


}

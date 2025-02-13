import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './pantallas/login/login.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SideNavBarComponent, 
    LoginComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hache Servicios';
  loggedIn = false;

  constructor(private authService: AuthService) {
     this.loggedIn = authService.loggedIn
  }
}

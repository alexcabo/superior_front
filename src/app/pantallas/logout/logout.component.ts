import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [ ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

    constructor(private router: Router,private authService: AuthService) {
      
    }

    ngOnInit(): void {
      if (this.authService.loggedIn) {
        this.authService.logout();
        console.log('Logout exitoso');
        //this.router.navigate(['/nada'])
      }
      //this.authService.logout();
      //console.log('Logout exitoso');
      //this.router.navigate(['/']).then((navigated) => {
      //console.log('Navegación realizada:', navigated);
      //});
    }
}

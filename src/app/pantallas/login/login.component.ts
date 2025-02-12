import { Component, inject } from '@angular/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatInput,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private _snackBar = inject(MatSnackBar);
  documento = '';
  password = '';
  constructor(private router: Router, private authService: AuthService) {}

  onLogin(): void {
    this.authService.login(this.documento, this.password).subscribe({
      next: (response) => {
        if (response.estado === false) {
          this._snackBar.open(
            response.mensaje || 'Error de autenticación.',
            'Cerrar',
            {
              duration: 4000,
              panelClass: 'notificacionError',
            }
          );
          console.error('Error en la respuesta del backend:', response.mensaje);
        } else {
          this._snackBar.open('Inicio de sesión exitoso.', 'Cerrar', {
            duration: 5000,
            panelClass: 'notificacionCorrecta',
          });
          console.log('Login exitoso');
          this.router.navigate(['/manuales']).then((navigated) => {
            console.log('Navegación realizada:', navigated);
          });
        }
      },
      error: (error) => {
        this._snackBar.open('Error de autenticación.', 'Cerrar', {
          duration: 4000,
          panelClass: 'notificacionError',
        });
        console.error('Error de autenticación', error);
      },
    });
  }
}

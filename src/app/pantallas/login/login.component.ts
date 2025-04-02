import { Component, inject } from '@angular/core';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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
    // Verificación de que no haya campos vacíos
    if (!this.documento || !this.password) {
      this._snackBar.open(
        'No Completó los datos.',
        'Cerrar',
        {
          duration: 4000,
          panelClass: 'notificacionError',
        }
      );
      return
    }

    // Llamamos al servicio de autenticación para hacer login
    this.authService.login(this.documento, this.password).subscribe({
      next: (response) => {
        // Si la respuesta indica que la autenticación falló (estado === false)
        console.log(response);

        if (response.estado === false) {
          this._snackBar.open(
            response.mensaje || 'Error de autenticación.',
            'Cerrar',
            {
              duration: 4000,
              panelClass: 'notificacionError',
            }
          );
          //console.error('Error en la respuesta del backend:', response.mensaje);
        } else {
          // Si la autenticación fue exitosa
          this._snackBar.open('Inicio de sesión exitoso.', 'Cerrar', {
            duration: 5000,
            panelClass: 'notificacionCorrecta',
          });
          //console.log('Login exitoso');
  
          // Guardar el token de acceso en el localStorage
          localStorage.setItem('access_token', response.token);
  
          // Redirigir al dashboard después de un login exitoso
          this.router.navigate(['/dashboard']).then((navigated) => {
            if (navigated) {
              //console.log('Navegación exitosa al dashboard');
            } else {
              //console.log('Falló la navegación al dashboard');
            }
          });
        }
      },
      error: (error) => {
        // Manejo de error si la solicitud falla
        this._snackBar.open('Error de autenticación.', 'Cerrar', {
          duration: 4000,
          panelClass: 'notificacionError',
        });
        //console.error('Error de autenticación', error);
      },
    });
  }
  
}

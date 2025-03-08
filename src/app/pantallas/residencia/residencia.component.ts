import { Component } from '@angular/core';
import { PaisesComponent } from '../residencia/paises/paises.component';
import { ProvinciasComponent } from '../residencia/provincias/provincias.component';

@Component({
  selector: 'app-residencia',
  imports: [
    PaisesComponent,
    ProvinciasComponent
  ],
  templateUrl: './residencia.component.html',
  styleUrl: './residencia.component.css'
})
export class ResidenciaComponent {
  paisSeleccionado: number | null = null;

  // Función para manejar la selección del país
  onPaisSeleccionado(paisId: number): void {
    this.paisSeleccionado = paisId;
  }
}

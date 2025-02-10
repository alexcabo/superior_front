import { Component } from '@angular/core';
import { PaisesService } from '../services/paises.service'; 
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
  paises: any[] = [];

  constructor(private paisesService: PaisesService) {}

  ngOnInit() {
    // Llamamos al servicio para obtener los países
    this.paisesService.obtenerPaises().subscribe((data) => {
      this.paises = data.paises;  // Asignamos la respuesta al array 'paises'
    });
  }
}

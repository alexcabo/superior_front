import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { PaisesService } from '../../../services/paises.service';

@Component({
  selector: 'app-read',
  imports: [MatTableModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './read.component.html',
  styleUrl: './read.component.css'
})
export class ReadComponent {
  datos: any[] = [];

  constructor(private paisesService: PaisesService) {}

  ngOnInit(): void {
    this.paisesService.obtenerPaises().subscribe((data) => {
      this.datos = data.paises;  // Asignamos la respuesta al array 'paises'
    });
  }

  deleteItem(id: number): void {

  }
}

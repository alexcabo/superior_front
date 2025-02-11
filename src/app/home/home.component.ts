
import { CommonModule } from '@angular/common';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { PaisesService } from '../services/paises.service';
import { AddEditComponent } from '../pantallas/paises/add-edit/add-edit.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule,
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
  // paises: any[] = [];

  // constructor(private paisesService: PaisesService) {}

  // ngOnInit() {
  //   // Llamamos al servicio para obtener los países
  //   this.paisesService.obtenerPaises().subscribe((data) => {
  //     this.paises = data.paises;  // Asignamos la respuesta al array 'paises'
  //   });
  // }

// the columns that will be displayed in the employee details table
displayedColumns: string[] = [
  'id',
  'Nombre',
  'Id_afip',
  'Cuit Fisica',
  'Cuit Juridica',
  'Cuit Otra',
  'actiones',
];

// employee list will be assigned to this and it is passed as the data source to the mat-table in the HTML template
dataSource!: MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

// dependency injection
constructor(
  private dialog: MatDialog,
  private servService: PaisesService,
) {}

ngOnInit(): void {
  this.getList();
}

openAddEditDialog() {
  const dialogRef = this.dialog.open(AddEditComponent);
  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        this.getList();
      }
    },
  });
}

getList() {
  this.servService.getList().subscribe({
    next: (res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(res);
    },
    error: (err) => {
      console.log(err);
    },
  });
}
// for searching employees with firstname, lastname, gennder, etc
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

delete(id: number) {
  let confirm = window.confirm("¿ Elimina el Registro ?");
  if(confirm) {
    this.servService.delete(id).subscribe({
      next: (res) => {
        alert('Employee deleted!');
        this.getList();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

openEditForm(data: any) {
  const dialogRef = this.dialog.open(AddEditComponent, {
    data,
  });

  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        this.getList();
      }
    }
  });
}
}

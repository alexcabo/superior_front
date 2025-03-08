
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

import { PaisesService } from '../../../services/paises.service';
import { AddEditComponent } from './add-edit/add-edit.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-paises',
  imports: [
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
    MatSortModule,
    RouterModule
  ],
  templateUrl: './paises.component.html',
  styleUrl: './paises.component.css'
})


export class PaisesComponent {
  dataSourceProv: any[] = [];  // lista de países
  provincias: any[] = [];  // almacenaremos las provincias
  
  @Output() paisSeleccionado = new EventEmitter<number>();

// the columns that will be displayed in the employee details table
displayedColumns: string[] = [
  //'id',
  'nombre',
  // 'id_afip',
  // 'cuit_fisica',
  // 'cuit_juridica',
  // 'cuit_otra',
  'acciones',
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

onSelectPais(paisId: number): void {
  this.paisSeleccionado.emit(paisId); // Emite el ID del país seleccionado
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
      this.dataSource = new MatTableDataSource(res.message);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      //console.log(res);
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

  if(confirm == true) {
    this.servService.delete(id).subscribe({
      next: () => {
        alert('Registro Eliminado!');
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

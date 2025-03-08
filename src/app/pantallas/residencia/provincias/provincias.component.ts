
import { Component, Input, ViewChild } from '@angular/core';
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
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProvinciasService } from '../../../services/provincias.service';
import { AddEditComponent } from './add-edit/add-edit.component';

@Component({
  standalone: true,
  selector: 'app-provincias',
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
  templateUrl: './provincias.component.html',
  styleUrl: './provincias.component.css'
})


export class ProvinciasComponent {


// the columns that will be displayed in the employee details table
displayedColumns: string[] = [
  //'id',
  'nombre',
  // 'id_afip',
  'id_pais',
  'acciones',
];

// employee list will be assigned to this and it is passed as the data source to the mat-table in the HTML template
dataSource!: MatTableDataSource<any>;
@Input() paisId: number | null = null; // Recibe el ID del país

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

// dependency injection
constructor(
  private route: ActivatedRoute,
  private dialog: MatDialog,
  private servService: ProvinciasService,
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
  // Si hay un paisId, filtramos por ese id, si no, obtenemos todas las provincias
  if (this.paisId) {
    this.servService.getProvincias(this.paisId).subscribe({
      next: (res) => {
        //console.log(res.message);
        this.dataSource = new MatTableDataSource(res.message);  // Asume que la respuesta es un array de provincias
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  } else {
    // Si no hay paisId, obtenemos todas las provincias
    this.servService.getList().subscribe({
      next: (res) => {
        //console.log(res.message);
        this.dataSource = new MatTableDataSource(res.message);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
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

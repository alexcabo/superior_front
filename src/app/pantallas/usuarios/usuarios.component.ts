import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuariosService } from '../../services/usuarios.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios',
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
    MatSortModule
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
rol: string = '';
nombreRol: string = '';
 dataSourceProv: any[] = [];  // lista de países
 registros: any[] = [];  

// the columns that will be displayed in the employee details table
displayedColumns: string[] = [
  //'id',
  'dni',
  'name',
  'domicilio',
  'email',
  'telefono',
  'acciones',
];

// employee list will be assigned to this and it is passed as the data source to the mat-table in the HTML template
dataSource!: MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

// dependency injection
constructor(
  private route: ActivatedRoute,
  private servService: UsuariosService,
) {}


ngOnInit(): void {
    // Obtenemos el parámetro 'rol' desde la ruta
    this.route.paramMap.subscribe(params => {
      this.rol = params.get('rol') || '';  // Le asignamos el valor del parámetro
    });

    if (this.rol == 'D') {
      this.nombreRol = 'DOCENTES';
    }
    if (this.rol == 'E') {
      this.nombreRol = 'ALUMNOS';
    }
    if (this.rol == 'A') {
      this.nombreRol = 'ADMINISTRATIVOS';
    }
  this.getList();
}


openAddEditDialog() {
  // const dialogRef = this.dialog.open(AddEditComponent);
  // dialogRef.afterClosed().subscribe({
  //   next: (val) => {
  //     if (val) {
  //       this.getList();
  //     }
  //   },
  // });
}

getList() {
  this.servService.getList(this.rol).subscribe({
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
  // const dialogRef = this.dialog.open(AddEditComponent, {
  //   data,
  // });

  // dialogRef.afterClosed().subscribe({
  //   next: (val) => {
  //     if (val) {
  //       this.getList();
  //     }
  //   }
  // });
}
}

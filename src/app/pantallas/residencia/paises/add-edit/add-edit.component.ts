import { Component, Inject, OnInit  } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { PaisesService } from '../../../../services/paises.service';

@Component({
  standalone: true,
  selector: 'app-add-edit',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css'
})

export class AddEditComponent implements OnInit {
  empForm: FormGroup;

  constructor(
    private servService: PaisesService,
    private dialogRef: MatDialogRef<AddEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      id_afip: [''],
      cuit_fisica: [''],
      cuit_juridica: [''],
      cuit_otra: ['']
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.servService
          .update(this.data.id, this.empForm.value)
          .subscribe({
            next: (val) => {
              //console.log(val);
              //alert('Registro Actualizado!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              alert("Error al Actualziar Registro!");
            },
          });
      } else {
        this.servService.add(this.empForm.value).subscribe({
          next: (val: any) => {
            //alert('Registro Agregado!');
            this.empForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            alert("Error al Agregar el Registro!");
          },
        });
      }
    }
  }

}

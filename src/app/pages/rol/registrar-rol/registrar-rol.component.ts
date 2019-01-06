import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Rol } from 'src/app/_model/rol';
import { RolService } from 'src/app/_service/rol.service';

@Component({
  selector: 'app-registrar-rol',
  templateUrl: './registrar-rol.component.html',
  styleUrls: ['./registrar-rol.component.css']
})
export class RegistrarRolComponent implements OnInit {

  rol: Rol;

  constructor(
    private dialogRef: MatDialogRef<RegistrarRolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Rol,
    private rolService: RolService
  ) {}

  ngOnInit() {
    this.rol = new Rol();
    this.rol.idRol = this.data.idRol;
    this.rol.nombre = this.data.nombre;
    this.rol.descripcion = this.data.descripcion;
  }

  operar() {
    if ( this.rol.idRol !== undefined ) {
      this.rolService.modificar(this.rol).subscribe(data => {
        this.rolService.listar().subscribe(medicos => {
          this.rolService.rolesCambio.next(medicos);
          this.rolService.mensajeCambio.next('Se modificó');
        });
      });
    } else {
      this.rolService.registrar(this.rol).subscribe(data => {
        this.rolService.listar().subscribe(medicos => {
          this.rolService.rolesCambio.next(medicos);
          this.rolService.mensajeCambio.next('Se registro');
        });
      });
    }
    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }
}

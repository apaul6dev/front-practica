import { Component, OnInit, ViewChild } from '@angular/core';
import { RolService } from 'src/app/_service/rol.service';
import { Rol } from 'src/app/_model/rol';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { RegistrarRolComponent } from './registrar-rol/registrar-rol.component';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  displayedColumns = ['id_rol', 'nombre', 'descripcion', 'acciones'];
  dataSource: MatTableDataSource<Rol>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private rolService: RolService, private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.rolService.rolesCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.rolService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    this.rolService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  registrar(rol?: Rol) {
    const r = rol != null ? rol : new Rol();
    this.dialog.open(RegistrarRolComponent, {
      width: '250px',
      disableClose: false,
      data: r
    });
  }


  actualizar(rol?: Rol) {
    const r = rol != null ? rol : new Rol();
    this.dialog.open(RegistrarRolComponent, {
      width: '250px',
      disableClose: false,
      data: r
    });
  }

  eliminar(rol?: Rol) {
    this.rolService.eliminar(rol.idRol).subscribe(data => {
      this.rolService.listar().subscribe(roles => {
        this.rolService.rolesCambio.next(roles);
        this.rolService.mensajeCambio.next('Se eliminó');
      });
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}

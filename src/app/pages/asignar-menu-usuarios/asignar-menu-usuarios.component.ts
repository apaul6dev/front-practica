import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/_model/usuario';
import { MatTableDataSource, MatPaginator,
  MatSort, MatSnackBar } from '@angular/material';
import { UsuarioService } from 'src/app/_service/usuario.service';

@Component({
  selector: 'app-asignar-menu-usuarios',
  templateUrl: './asignar-menu-usuarios.component.html',
  styleUrls: ['./asignar-menu-usuarios.component.css']
})
export class AsignarMenuUsuariosComponent implements OnInit {
  usuarioSeleccionado: Usuario;
  displayedColumns = ['id_usuario', 'username', 'enabled', 'acciones'];
  dataSource: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usuarioService: UsuarioService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.usuarioSeleccionado = new Usuario();
    this.usuarioService.usuariosCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.usuarioService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    this.usuarioService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  asignarRol(row: any) {
    console.log(row);
    this.usuarioSeleccionado = row;
    // this.buscarRoleNoAsignados(this.menuSeleccionado.idMenu);
  }


}

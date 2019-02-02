import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/_model/usuario';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatSnackBar
} from '@angular/material';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { FormControl } from '@angular/forms';
import { RolService } from 'src/app/_service/rol.service';
import { Rol } from 'src/app/_model/rol';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-asignar-menu-usuarios',
  templateUrl: './asignar-menu-usuarios.component.html',
  styleUrls: ['./asignar-menu-usuarios.component.css']
})
export class AsignarMenuUsuariosComponent implements OnInit {
  ini = 0;
  fin = 3;
  cantidad: number;
  usuarioSeleccionado: Usuario;
  displayedColumns = ['id_usuario', 'username', 'enabled', 'acciones'];

  toppings = new FormControl();
  toppingList: Rol[] = [];  // ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];


  dataSource: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private usuarioService: UsuarioService,
    private rolesService: RolService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.usuarioSeleccionado = new Usuario();

    this.usuarioService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    this.usuarioService.usuariopages(this.ini, this.fin).subscribe(data => {
      const usuarios = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(usuarios);
      this.dataSource.sort = this.sort;
    });
  }

  mostrarMas(e: any) {
    this.ini = e.pageIndex;
    this.fin = e.pageSize;
    this.usuarioService.usuariopages(this.ini, this.fin).subscribe(data => {
      const menus = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(menus);
      this.dataSource.sort = this.sort;
      this.usuarioSeleccionado = new Usuario();
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  asignarRol(row: any) {
    this.usuarioSeleccionado = row;
    this.buscarRolesNoAsignados();
  }

  buscarRolesNoAsignados() {
    this.rolesService.rolesUsuarioNoAsinados(this.usuarioSeleccionado.idUsuario).subscribe(
      rs => {
      // console.log(rs);
      this.toppingList = rs;
    });
  }

  aceptar() {
    let usNew = new Usuario();
    usNew.idUsuario = this.usuarioSeleccionado.idUsuario;
    usNew.roles = this.usuarioSeleccionado.roles;
    this.toppings.value.forEach(element => {
      usNew.roles.push(element);
    });
//    console.log(JSON.stringify(usNew));
    this.usuarioService.actualizar(usNew).subscribe( rs => {
          this.usuarioService.usuariopages(this.ini, this.fin).subscribe(d => {
          this.usuarioService.usuariosCambio.next(d);
          this.usuarioService.mensajeCambio.next('Se modificó');
        });
        this.buscarRolesNoAsignados();
      }

    );
    usNew = new Usuario();
  }

  cancelar() {

  }

}

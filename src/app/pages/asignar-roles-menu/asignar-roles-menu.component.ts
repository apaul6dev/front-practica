import { Component, OnInit, ViewChild } from '@angular/core';
import { RolService } from 'src/app/_service/rol.service';
import { MenuService } from 'src/app/_service/menu.service';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatSnackBar
} from '@angular/material';
import { Menu } from 'src/app/_model/menu';
import { Rol } from 'src/app/_model/rol';

@Component({
  selector: 'app-asignar-roles-menu',
  templateUrl: './asignar-roles-menu.component.html',
  styleUrls: ['./asignar-roles-menu.component.css']
})
export class AsignarRolesMenuComponent implements OnInit {
  ini = 0;
  fin = 3;
  cantidad: number;
  menuSeleccionado: Menu;
  rolesNoAsignados: Rol[];

  displayedColumns = ['id_menu', 'icono', 'nombre', 'url', 'acciones'];
  dataSource: MatTableDataSource<Menu>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private rolService: RolService,
    private menuService: MenuService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.menuSeleccionado = new Menu();

    this.menuService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    this.menuService.menuspages(this.ini, this.fin).subscribe(data => {
      const menus = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(menus);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  mostrarMas(e: any) {
    // if (e !== -1) {
      this.ini = e.pageIndex;
      this.fin = e.pageSize;
    // }
    // console.log('paginado: ');
    this.menuService.menuspages(this.ini, this.fin).subscribe(data => {
      // console.log(data);
      const menus = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(menus);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.menuSeleccionado = new Menu();
    });
  }

  asignarRol(row: any) {
    this.menuSeleccionado = row;
    this.buscarRoleNoAsignados(this.menuSeleccionado.idMenu);
  }

  buscarRoleNoAsignados(idMenu: number) {
    this.rolService.rolesMenuNoAsinados(idMenu).subscribe(rs => {
      this.rolesNoAsignados = rs;
    });
  }

  asignarRolAMenu(row: any) {
    this.menuSeleccionado.roles.push(row);
    this.menuService.actualizar(this.menuSeleccionado).subscribe(rs => {
      this.asignarRol(this.menuSeleccionado);
      this.menuService.mensajeCambio.next('Se Actualizó');
    });
  }

  eliminarRolAMenu(row: any) {
    const indice = this.buscarRol(this.menuSeleccionado.roles, row.idRol);
    if (indice !== -1) {
      this.menuSeleccionado.roles.splice(indice, 1);
      this.menuService.actualizar(this.menuSeleccionado).subscribe(rs => {
        this.asignarRol(this.menuSeleccionado);
        this.menuService.mensajeCambio.next('Se eliminó');
      });
    }
  }

  buscarRol(roles: Rol[], id: number) {
    for (let index = 0; index < roles.length; index++) {
      const e = roles[index];
      if (e.idRol === id) {
        return index;
      }
    }
    return -1;
  }
}

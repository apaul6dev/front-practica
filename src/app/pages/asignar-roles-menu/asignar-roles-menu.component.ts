import { Component, OnInit, ViewChild } from '@angular/core';
import { RolService } from 'src/app/_service/rol.service';
import { MenuService } from 'src/app/_service/menu.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Menu } from 'src/app/_model/menu';

@Component({
  selector: 'app-asignar-roles-menu',
  templateUrl: './asignar-roles-menu.component.html',
  styleUrls: ['./asignar-roles-menu.component.css']
})
export class AsignarRolesMenuComponent implements OnInit {

  displayedColumns = ['id_menu', 'icono', 'nombre', 'url', 'acciones'];
  dataSource: MatTableDataSource<Menu>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private rolService: RolService, private menuService: MenuService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.menuService.menuCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.menuService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    this.menuService.listar().subscribe(data => {
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
  }

}

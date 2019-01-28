import { Component, OnInit, ViewChild } from '@angular/core';
import { Menu } from 'src/app/_model/menu';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { MenuService } from 'src/app/_service/menu.service';
import { RegistrarMenuComponent } from './registrar-menu/registrar-menu.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  cantidad: number;
  ini = 0;
  fin = 3;

  displayedColumns = ['id_menu', 'icono', 'nombre', 'url', 'acciones'];

  dataSource: MatTableDataSource<Menu>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private menuService: MenuService, private dialog: MatDialog,
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

/*     this.menuService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }); */
    this.menuService.menuspages(this.ini, this.fin).subscribe(data => {
      const menus = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(menus);
      this.dataSource.sort = this.sort;
    });

  }

  mostrarMas(e: any) {
    this.ini = e.pageIndex;
    this.fin = e.pageSize;
    this.menuService.menuspages(this.ini, this.fin).subscribe(data => {
      const menus = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(menus);
      this.dataSource.sort = this.sort;
    });
  }

  registrar(menu?: Menu) {
     const r = menu != null ? menu : new Menu();
    this.dialog.open(RegistrarMenuComponent, {
      width: '250px',
      disableClose: false,
      data: r
    });
  }

  actualizar(row: any) {
    this.dialog.open(RegistrarMenuComponent, {
      width: '250px',
      disableClose: false,
      data: row
    });
  }

  eliminar(row: any) {
    this.menuService.eliminar(row.idMenu).subscribe(data => {
      this.menuService.listar().subscribe(roles => {
        this.menuService.menuCambio.next(roles);
        this.menuService.mensajeCambio.next('Se eliminó');
      });
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}

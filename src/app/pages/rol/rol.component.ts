import { Component, OnInit, ViewChild } from '@angular/core';
import { RolService } from 'src/app/_service/rol.service';
import { Rol } from 'src/app/_model/rol';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

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

  constructor(private rolService: RolService) { }

  ngOnInit() {

    this.rolService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }


  openDialog(rol?: Rol) {}

  eliminar(rol?: Rol) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}

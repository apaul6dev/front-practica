import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MenuService } from 'src/app/_service/menu.service';
import { Menu } from 'src/app/_model/menu';

@Component({
  selector: 'app-registrar-menu',
  templateUrl: './registrar-menu.component.html',
  styleUrls: ['./registrar-menu.component.css']
})
export class RegistrarMenuComponent implements OnInit {

  menu: Menu;
  titulo = '';
  constructor(
    private dialogRef: MatDialogRef<RegistrarMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Menu,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.menu = new Menu();

    this.titulo = this.data.idMenu === undefined ? 'Registrar' : 'Actualizar';

    this.menu.idMenu = this.data.idMenu;
    this.menu.nombre = this.data.nombre;
    this.menu.url = this.data.url;
    this.menu.icono = this.data.icono;

  }
  operar() {
     if ( this.menu.idMenu !== undefined ) {
      this.menuService.actualizar(this.menu).subscribe(data => {
        this.menuService.listar().subscribe(d => {
          this.menuService.menuCambio.next(d);
          this.menuService.mensajeCambio.next('Se modificó');
        });
      });
    } else {
       this.menuService.actualizar(this.menu).subscribe(data => {
        this.menuService.listar().subscribe(d => {
          this.menuService.menuCambio.next(d);
          this.menuService.mensajeCambio.next('Se registro');
        });
      });
    }
    this.dialogRef.close();
  }
  cancelar() {
    this.dialogRef.close();
  }
}

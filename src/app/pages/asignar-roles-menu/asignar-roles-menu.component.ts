import { Component, OnInit } from '@angular/core';
import { RolService } from 'src/app/_service/rol.service';
import { MenuService } from 'src/app/_service/menu.service';

@Component({
  selector: 'app-asignar-roles-menu',
  templateUrl: './asignar-roles-menu.component.html',
  styleUrls: ['./asignar-roles-menu.component.css']
})
export class AsignarRolesMenuComponent implements OnInit {

  constructor(private rolService: RolService, private menuService: MenuService) { }

  ngOnInit() {
  }

}

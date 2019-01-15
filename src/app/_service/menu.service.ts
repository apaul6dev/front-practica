import { Subject } from 'rxjs';
import { Menu } from './../_model/menu';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST, TOKEN_NAME } from './../_shared/var.constant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuCambio = new Subject<Menu[]>();
  mensajeCambio = new Subject<string>();

  private url = `${HOST}`;

  constructor(private http: HttpClient) { }

  listar() {
    const access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Menu[]>(`${this.url}/menus`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarPorUsuario(nombre: string) {
    const access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post<Menu[]>(`${this.url}/menus/usuario`, nombre, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  menuspages(p: number, s: number) {
    return this.http.get<Menu[]>(`${this.url}/menus/menuspages?page=${p}&size=${s}`);
  }
}

import { Injectable } from '@angular/core';
import { Rol } from '../_model/rol';
import { Subject } from 'rxjs';
import { HOST } from '../_shared/var.constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  rolesCambio = new Subject<Rol[]>();
  mensajeCambio = new Subject<string>();
  url = `${HOST}/roles`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Rol[]>(this.url);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  modificar(rol: Rol) {
    return this.http.put(this.url, rol);
  }

  registrar(rol: Rol) {
    return this.http.post(this.url, rol);
  }

}

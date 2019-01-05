import { Injectable } from '@angular/core';
import { Rol } from '../_model/rol';
import { Subject } from 'rxjs';
import { HOST } from '../_shared/var.constant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  rolCambio = new Subject<Rol>();
  mensajeCambio = new Subject<string>();
  url = `${HOST}/roles`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Rol[]>(this.url);
  }

}

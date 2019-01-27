import { MenuService } from './../_service/menu.service';
import { Router } from '@angular/router';
import { TOKEN_NAME } from './../_shared/var.constant';
import { LoginService } from './../_service/login.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import '../login-animation.js';
// import * as decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  usuario: string;
  clave: string;
  mensaje = '';
  error = '';

  constructor(private loginService: LoginService,
    private router: Router,
    private menuService: MenuService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }

  iniciarSesion() {
    this.loginService.login(this.usuario, this.clave).subscribe(data => {
      if (data) {
        const helper = new JwtHelperService();

        const token = JSON.stringify(data);
        sessionStorage.setItem(TOKEN_NAME, token);

        const tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
        const decodedToken = helper.decodeToken(tk.access_token);
        // const decodedToken = decode(tk.access_token);

        this.menuService.listarPorUsuario(decodedToken.user_name).subscribe(data2 => {
          this.menuService.menuCambio.next(data2);
        });

        this.router.navigate(['paciente']);
      }
    });
  }

}

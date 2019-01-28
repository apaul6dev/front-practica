import { Rol } from './rol';

export class Usuario {
  idUsuario: number;
  username: string;
  enabled: boolean;
  roles: Rol[];
}

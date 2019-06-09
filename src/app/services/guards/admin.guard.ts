import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/service.index';
import { observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService,
               public router: Router) {}
  canActivate() {
    if (this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log('Bloqueado por el Admin Guard');
      this.router.navigate(['/dashboard']);
      return false;
    }

  }
}

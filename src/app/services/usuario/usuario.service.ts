import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
// import * as swal from 'sweetalert';
declare var swal: any;
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[];

  constructor( public http: HttpClient,
               public router: Router,
               public _subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
  }
  renuevaToken(){
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;
    return this.http.get(url)
    .pipe( map( (resp: any) => {
      this.token = resp.token;
      localStorage.setItem('token', this.token);
      return true;
    }), catchError(err => of([
      // console.log('HTTP Error', err.status),
      swal('Error renovando token', 'No se pudo renovar token', 'error'),
      this.logout()
    ])));
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar === true) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
    .pipe( map( (resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
      return true;
    }), catchError(err => of([
      // console.log('HTTP Error', err.status),
      swal('Error Login', err.error.mensaje, 'error')
    ])));
  }

  estaLogeado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario)
    .pipe( map( (resp: any) => {
      swal('Usuario Creado', usuario.email, 'success');
      return resp.Usuario;
    }), catchError(err => of([
      // console.log('HTTP Error', err.status),
      swal(err.error.mensaje, err.error.errors.message, 'error')
    ])));
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario)
    .pipe( map( (resp: any) => {
      if (usuario._id === this.usuario._id ) {
        const usuarioDB: Usuario = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
      }
      swal('Usuario actualizado', usuario.nombre, 'success');
      return true;
    }), catchError(err => of([
      // console.log('HTTP Error', err.status),
      swal(err.error.mensaje, err.error.errors.message, 'error')
    ])));
  }

  cambiarImagen( archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then( (resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch( resp => {
        console.log(resp);
      });
  }

  cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;
    return this.http.get(url)
    .pipe( map( (resp: any) => resp.usuario ));

  }

  borrarUsuarios(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
    .pipe( map( resp => {
       swal('Usuario Borrado','El usuario ha sido borrado correctamente','success'); 
       return true;
    }));

  }

}

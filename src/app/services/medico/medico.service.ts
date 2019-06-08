import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';
declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalMedicos: number = 0;
  token: string;
  constructor(public http: HttpClient,
              public router: Router,
              public _subirArchivoService: SubirArchivoService,
              public _usuarioService: UsuarioService ) { 
                this.cargarStorage();
              }

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  cargarMedicos(desde: number = 0) {
    const url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get(url)
    .pipe( map( (resp: any) => {
      this.totalMedicos = resp.total;
      return resp.medicos;
    }));
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
    .pipe( map( (resp: any) => {
      return resp.medico;
    }));
  }

  buscarMedico(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medico/' + termino;
    return this.http.get(url)
    .pipe( map( (resp: any) => resp.medico ));
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
    .pipe( map( resp => {
       swal('Medico Borrado', 'El medico ha sido borrado correctamente', 'success');
       return true;
    }));
  }

  guardarMedico( medico: Medico) {
    let url = URL_SERVICIOS + '/medico';
    if (medico._id) {
      // actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, medico )
      .pipe( map( (resp: any) => {
        swal('Medico actualizado', medico.nombre, 'success');
        return resp.medico;
      }));
    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico )
      .pipe( map( (resp: any) => {
        swal('Medico Creado', medico.nombre, 'success');
        return resp.medico;
      }));
    }
  }
}

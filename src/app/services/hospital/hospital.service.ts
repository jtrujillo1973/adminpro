import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
declare var swal: any;

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  token: string;

  constructor(public http: HttpClient,
              public router: Router,
              public _subirArchivoService: SubirArchivoService ) {
                this.cargarStorage();

               }

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  cargarHospitales(desde: number = 0) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url);
  }

  cargarHospitales2() {
    const url = URL_SERVICIOS + '/hospital';
    return this.http.get(url)
    .pipe( map( (resp: any) => {
      return resp.hospitales;
    }));
  }

  crearHospital( nombre: string) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.token;
    return this.http.post(url, { nombre } )
    .pipe( map( (resp: any) => {
      swal('Hospital Creado', resp.hospital.nombre, 'success');
      return resp.Hospital;
    }));
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.token;
    console.log(url);
    return this.http.put(url, hospital)
    .pipe( map( (resp: any) => {
      swal('Hospital actualizado', hospital.nombre, 'success');
      return true;
    }));
  }

  cambiarImagen( archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'hospitales', id)
      .then( (resp: any) => {
        this.hospital.img = resp.hospital.img;
        swal('Imagen actualizada', this.hospital.nombre, 'success');
      })
      .catch( resp => {
        console.log(resp);
      });
  }

  borrarHospitales(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
    .pipe( map( resp => {
       swal('Hospital Borrado', 'El hospital ha sido borrado correctamente', 'success');
       return true;
    }));
  }

  buscarHospitales(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;
    return this.http.get(url)
    .pipe( map( (resp: any) => resp.hospital ));
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
    .pipe( map( (resp: any) => resp.hospital ));
  }

}

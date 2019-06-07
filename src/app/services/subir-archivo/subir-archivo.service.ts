import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }
  subirArchivo( archivo: File, tipo: string, id: string) {

    return new Promise((resolve, reject) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4) {
          if ( xhr.status === 200) {
            console.log('imagen subida');
            resolve( JSON.parse(xhr.response));
          } else {
            console.log('Fallo subida');
            reject( xhr.response );
          }
        }
      };

      const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send( formData );

    });


  }
}

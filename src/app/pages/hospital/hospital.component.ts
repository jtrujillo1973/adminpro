import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
declare var swal: any;


@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor( public _hospitalService: HospitalService,
               public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
      .subscribe(resp => this.cargarHospitales());
  }

  mostraModal(id) {
    this._modalUploadService.mostrarModal('hospital', id);
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde)
    .subscribe( (resp: any) => {
      this.hospitales = resp.hospitales;
      this.totalRegistros = resp.total;
      this.cargando = false;
    });
  }
  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHospitales(termino)
    .subscribe( hospital => {
      this.hospitales = hospital;
      this.cargando = false;
    });
  }

  borrarHospital(hospital: Hospital) {
    // if (hospital._id === this._hospitalService.hospital._id) {
    //   swal('No puede borrar hospital', 'No se puede borrar a si mismo', 'error');
    //   return;
    // }

    swal ({
      title: 'Esta seguro ?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
      if (borrar) {
        this._hospitalService.borrarHospitales(hospital._id)
        .subscribe( borrado => {
          console.log(borrado);
          this.getUsers(5);
          this.cargarHospitales();
        });
      }
    });
  }

  getUsers(amount?: number) {
    if (amount === 5 &&
      this.totalRegistros - this.desde === 1) {
      this.desde = (this.totalRegistros - 1 ) - amount;
    }

    this._hospitalService.cargarHospitales(this.desde)
       .subscribe((res: any) => {
         this.desde = res.users;
         this.totalRegistros = res.userCount;
       });
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
    .subscribe();
  }
  crearHospital() {
    swal( {
      title: 'Creacion de hospital',
      text: 'Digite el nombre del hospital',
      icon: 'info',
      buttons: ['Cancelar', 'Crear'],
      content: 'input'
    }).then( valor => {
      if (!valor || valor.length < 0) {
        return;
      }
      this._hospitalService.crearHospital( valor )
        .subscribe( () => {
          this.cargarHospitales();
        });
    });
  }
  actualizarImagen(hospital: Hospital) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }
}

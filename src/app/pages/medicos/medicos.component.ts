import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  desde: number = 0;
  cargando: boolean = true;
  constructor(public _medicoService: MedicoService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarMedicos();
    this._modalUploadService.notificacion
      .subscribe(resp => this.cargarMedicos());
  }
  mostraModal(id) {
    this._modalUploadService.mostrarModal('hospital', id);
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicoService.cargarMedicos(this.desde)
    .subscribe( medicos => {
      this.medicos = medicos;
      this.cargando = false;
    });
  }
  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this._medicoService.totalMedicos) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this.cargando = true;
    this._medicoService.buscarMedico(termino)
    .subscribe( medico => {
      this.medicos = medico;
      this.cargando = false;
    });
  }

  borrarMedico(medico: Medico) {
    swal ({
      title: 'Esta seguro ?',
      text: 'Esta a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
      if (borrar) {
        this._medicoService.borrarMedico(medico._id)
        .subscribe( borrado => {
          console.log(borrado);
          this.cargarMedicos();
        });
      }
    });
  }
}

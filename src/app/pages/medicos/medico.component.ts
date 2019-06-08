import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');
  constructor(public _medicoService: MedicoService,
              public _hospitalService: HospitalService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public _modalUploadService: ModalUploadService) {
  activatedRoute.params.subscribe( params => {
    const id = params.id;
    if (id !== 'nuevo') {
      this.cargarMedico(id);
    }
  });
  }

  ngOnInit() {
      this._hospitalService.cargarHospitales2()
      .subscribe( hospitales => this.hospitales = hospitales );
      this._modalUploadService.notificacion
      .subscribe( resp => {
        this.medico.img = resp.medico.img;
      });
  }

  guardarMedico(f: NgForm) {
    // console.log(f.valid);
    // console.log(f.value);
    if (f.invalid) {
      return;
    }
    this._medicoService.guardarMedico(this.medico)
    .subscribe( medico => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    });
  }

  cambioHospital(id: string) {
    this._hospitalService.obtenerHospital(id)
    .subscribe( hospital => this.hospital = hospital );
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id)
    .subscribe( medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital ( this.medico.hospital);
    });
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}

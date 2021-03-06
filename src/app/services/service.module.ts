import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// tslint:disable-next-line:max-line-length
import { SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, SubirArchivoService, HospitalService, MedicoService } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { AdminGuard } from './guards/admin.guard';
import { VerificaTokenGuard } from './guards/verifica-token.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    HospitalService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    MedicoService,
    VerificaTokenGuard
  ],
  declarations: []

})
export class ServiceModule { }

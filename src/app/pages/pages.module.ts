import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';


import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { CommonModule } from '@angular/common';

// ngcharts2
import { ChartsModule } from 'ng2-charts';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

// pipe module
import { PipesModule } from '../pipes/pipes.module';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalComponent } from './hospital/hospital.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent,
        HospitalComponent,
        MedicosComponent,
        MedicoComponent
      ],
      exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
      ],
      imports: [
          CommonModule,
          SharedModule,
          PAGES_ROUTES,
          FormsModule,
          ChartsModule,
          PipesModule
      ]
})

export class PagesModule { }

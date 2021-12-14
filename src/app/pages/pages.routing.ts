import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphComponent } from './graph/graph.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorComponent } from './maintenance/doctors/doctor/doctor.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AdminGuard } from '../guards/admin.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progreso' } },
      { path: 'graphics', component: GraphComponent, data: { title: 'Graficos' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Configuración' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Perfil' } },

      // Maintenance

      { path: 'doctors', component: DoctorsComponent, data: { title: 'Médicos' } },
      { path: 'doctors/:id', component: DoctorComponent, data: { title: 'Médicos' } },
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitales' } },

      // Admin rputes
      { path: 'users', canActivate: [AdminGuard],  component: UsersComponent, data: { title: 'Usuarios' } },

      // Search
      { path: 'search/:term', component: SearchResultsComponent, data: { title: 'Resultados de búsqueda' } },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

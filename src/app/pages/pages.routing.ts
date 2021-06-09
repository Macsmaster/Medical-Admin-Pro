import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphComponent } from './graph/graph.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  { 
    path: 'dashboard', component: PagesComponent, 
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
      { path: 'graphics', component: GraphComponent, data: { title: 'Graphics' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Settings' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

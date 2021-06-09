import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Modules
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

// Components
import { ProgressComponent } from './progress/progress.component';
import { GraphComponent } from './graph/graph.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';







@NgModule({
  declarations: [
    ProgressComponent,
    GraphComponent,
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,

  ],
  exports:[
    ProgressComponent,
    GraphComponent,
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ComponentsModule,

 
  ]
})
export class PagesModule { }

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







@NgModule({
  declarations: [
    ProgressComponent,
    GraphComponent,
    DashboardComponent,
    PagesComponent,

  ],
  exports:[
    ProgressComponent,
    GraphComponent,
    DashboardComponent,
    PagesComponent,
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaseComponent } from './increase/increase.component';
import { FormsModule } from '@angular/forms';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    IncreaseComponent,
    DoughnutComponent
  ],

  exports: [
    IncreaseComponent, 
    DoughnutComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ChartsModule

  ],

})
export class ComponentsModule { }

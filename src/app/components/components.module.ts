import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaseComponent } from './increase/increase.component';
import { FormsModule } from '@angular/forms';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ChartsModule } from 'ng2-charts';
import { ModalImageComponent } from './modals/modal-image/modal-image.component';



@NgModule({
  declarations: [
    IncreaseComponent,
    DoughnutComponent,
    ModalImageComponent
  ],

  exports: [
    IncreaseComponent,
    DoughnutComponent,
    ModalImageComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],

})
export class ComponentsModule { }

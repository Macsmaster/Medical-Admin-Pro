import { Component, Input, OnInit } from '@angular/core';
import { Color, Colors, Label, MultiDataSet } from 'ng2-charts';



@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css']
})
export class DoughnutComponent implements OnInit {
  @Input() graphTitle: string = '';
  @Input() graphLabels: Label[] = [];
  @Input() graphData: MultiDataSet = [];
  @Input() graphColors: Colors[] = [];



  constructor() { }

  ngOnInit(): void {
  }

}

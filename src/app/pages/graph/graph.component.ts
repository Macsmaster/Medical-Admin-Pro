import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  public doughnutCharts = [{

    doughnutChartTitle: 'SALES',
    doughnutLabels: ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'],
    doughnutChartData: [
      [350, 450, 100],
    ],
    doughnutColors: [
      {
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      }
    ]
  },

  {

    doughnutChartTitle: 'WIN',
    doughnutLabels: ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'],
    doughnutChartData: [
      [350, 450, 200],
    ],
    doughnutColors: [
      {
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      }
    ]
  },

  {

    doughnutChartTitle: 'LOSE',
    doughnutLabels: ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'],
    doughnutChartData: [
      [350, 450, 600],
    ],
    doughnutColors: [
      {
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      }
    ]
  },

  {

    doughnutChartTitle: 'CLIENTS',
    doughnutLabels: ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'],
    doughnutChartData: [
      [350, 450, 20],
    ],
    doughnutColors: [
      {
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      }
    ]
  },




  ]


  constructor() { }

  ngOnInit(): void {
  }

}

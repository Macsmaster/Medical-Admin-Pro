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
    doughnutLabels: ['WIN 1', 'WIN 2', 'WIN 3'],
    doughnutChartData: [
      [250, 350, 50],
    ],
    doughnutColors: [
      {
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      }
    ]
  },

  {

    doughnutChartTitle: 'LOSE',
    doughnutLabels: ['Lose Sales', 'In-Store Sales', 'Mail-Order Sales'],
    doughnutChartData: [
      [650, 550, 200],
    ],
    doughnutColors: [
      {
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      }
    ]
  },

  {

    doughnutChartTitle: 'CLIENTS',
    doughnutLabels: ['New clients', 'Old Clients', 'Lose clients'],
    doughnutChartData: [
      [150, 950, 20],
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

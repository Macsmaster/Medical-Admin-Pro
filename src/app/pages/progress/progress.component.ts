import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  
  public progress1: number = 30;
  public progress2: number = 40;

  constructor() { }

  ngOnInit(): void {
  }

get getProgress1(){
   return `${this.progress1}%` 
  }

get getProgress2(){
   return `${this.progress2}%` 
  }

}

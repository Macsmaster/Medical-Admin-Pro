import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-increase',
  templateUrl: './increase.component.html',
  styleUrls: ['./increase.component.css']
})
export class IncreaseComponent implements OnInit {
  @Input() progress: number = 0;
  @Input() progressValue: number = 20;
  @Input() btnClassName: string = "btn-primary"

  @Output() changeValue: EventEmitter<number> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    this.btnClassName = `btn ${this.btnClassName}`
  }

  onChangeProgress(value: number) {
    if (this.progress <= 0 && value < 0) {
      this.changeValue.emit(0)
      this.progress = 0;
      return
      
    }
    if (this.progress >= 100 && value >= 0) {
        this.changeValue.emit(100)
        this.progress = 100
      return 
    }
    this.progress = this.progress + value;
    this.changeValue.emit(this.progress)
  }

  onChange( value: number ){
    
    if ( value >= 100 ){
      this.progress = 100;
    } else if ( value <= 0 ) {
      this.progress = 0;
    } else {
      this.progress = value;
    }

    this.changeValue.emit(this.progress)

    console.log(this.progress + 'hey')
  }

}

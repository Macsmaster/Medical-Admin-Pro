import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {
  public intervalSubs: Subscription; 

  constructor() {
    
     
 /*   this.returnObservable().pipe(
      retry()
    ).subscribe(
      valor => console.log('subs:', valor),
      error => console.log('Error', error),
      () => console.info('Se ha completado la tarea')
    )  */
  this.intervalSubs = this.returnInterval()
      .subscribe( console.log )

   }

   returnInterval(){
     const interval$ = interval(1000)
     .pipe(
        take(10),
        map( value =>  value + 1),
        filter( value => (value % 2 === 0) ? true : false ),
     );

     return interval$
   }

   returnObservable(): Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>(observer => {
      const interval =  setInterval( () => {
       i++
       observer.next(i)
       if(i === 5){
         clearInterval(interval);
         observer.complete()
       }

       if ( i === 2) {
         observer.error('Ha sucedido un error')
       }

      }, 1000 )
    });
    return obs$
   }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.intervalSubs.unsubscribe()
  }

}

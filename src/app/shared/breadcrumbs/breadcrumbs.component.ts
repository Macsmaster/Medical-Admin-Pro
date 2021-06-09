import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public title: string = '';
  public titleSubs$: Subscription;

  constructor( private router: Router, private route: ActivatedRoute) {
    console.log(route.snapshot.children[0])
  this.titleSubs$ =  this.getRouteParams()
    .subscribe( ({ title })  => {
    this.title = title
    document.title = `MedicalPro - ${ title }`
  })
}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe()
  }


  getRouteParams() {
   return this.router.events
    .pipe(
      filter( (event): event is ActivationEnd => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd) => event.snapshot.data),
    )
  }
}

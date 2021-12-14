import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 public user!: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { this.user = authService.user }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

  generalSearch(term: string){

    if( term.length === 0 ) {
      return
    }

    this.router.navigateByUrl(`dashboard/search/${term}`)
  }

}

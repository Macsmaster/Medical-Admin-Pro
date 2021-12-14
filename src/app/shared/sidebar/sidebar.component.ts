import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SidebarService } from '../../services/sidebar.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public user!: User

  constructor(public sidebarService: SidebarService,
    private authService: AuthService  ) {
    this.user = this.authService.user
  }

  ngOnInit(): void {
  }

}

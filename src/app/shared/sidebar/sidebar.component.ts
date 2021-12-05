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
  public menuItems: any[] = [];
  public user!: User

  constructor(private sidebarService: SidebarService,
    private authService: AuthService  ) {
    this.menuItems = this.sidebarService.menu;
    this.user = this.authService.user
  }

  ngOnInit(): void {
  }

}

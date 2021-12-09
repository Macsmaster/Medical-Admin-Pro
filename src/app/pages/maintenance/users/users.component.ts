import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild('txtTermino') txtTerm: ElementRef;

  public loading: boolean = null;
  public users: any;
  public usersTemp: any;
  public totalRegisters: number = 0;
  public currentPage: number = 0;
  private imgSubs: Subscription;
  constructor(
    private modalImageService: ModalImageService,
    private authService: AuthService,
    private userService: UserService,
    private searchService: SearchService
  ) {}

  ngOnDestroy(){
    this.imgSubs.unsubscribe;
  }

  ngOnInit(): void {
    this.getUsers();
   this.imgSubs = this.modalImageService.newImg
   .pipe(delay(100))
    .subscribe(img => this.getUsers());
  }



  getUsers() {
    this.loading = true;
    this.users = this.userService
      .getUsers(this.currentPage)
      .subscribe(({ total, users }) => {
        this.users = users;
        this.usersTemp = users;
        this.totalRegisters = total;
        this.loading = false;
      });
  }

  changePage(value: number) {
    this.currentPage += value;

    if (this.currentPage < 0) {
      this.currentPage = 0;
    } else if (this.currentPage > this.totalRegisters) {
      this.currentPage -= value;
    }
    this.getUsers();
  }

  onSearchTerm(term: string) {
    if (term.length === 0) {
      return (this.users = this.usersTemp);
    }

    this.searchService.getBySearch('users', term).subscribe((res) => {
      this.users = res;
    });
  }

  openModal(user: User){
    this.modalImageService.openModal(
      'users',
      user.uid,
      user.img
    );
  }

  onChangeRole(user: User){
    this.userService.saveUpdatedData(user)
      .subscribe( (res) => {

      })
  }

  onDeleteUser(user: User) {
    if( user.uid === this.authService.uid ) {
       Swal.fire(
        'Error',
        `You can't delete yourself`,
        'error'
      );
      return
    }
    Swal.fire({
      title: 'Are you sure to delete this user?',
      text: `You are about to delete the user ${user.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes delete it!'
    }).then((result: any) => {
      if( result.value) {
        this.userService.deleteUser( user.uid )
        .subscribe((res: any) => {
          this.getUsers();
          Swal.fire(
            'User deleted',
            `The user ${user.name} has been successfully deleted`,
            'success'
          );
        });
      }
    })
  }
}

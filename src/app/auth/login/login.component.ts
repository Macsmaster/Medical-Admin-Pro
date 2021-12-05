import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal  from 'sweetalert2';
import { AuthService } from '../services/auth.service';


declare const gapi:any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: any;
  public formSubmitted: boolean = false;
  public auth2: any;
  constructor(private router: Router,
    private authService: AuthService,
    private ngZone: NgZone ) {
      this.loadForm();
   }

  ngOnInit() {
    this.renderButton();
  }

  loadForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(localStorage.getItem('email' || ''), [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      remember: new FormControl(false, [Validators.nullValidator])
    })
  }


  onLoginUser() {
    this.authService.login(this.loginForm.value)
      .subscribe( res =>  {

        if(this.loginForm.get('remember').value){
          localStorage.setItem('email', this.loginForm.get('email').value);
        }
        else {
          localStorage.removeItem('email')
        }
        this.router.navigateByUrl('/')
      }, (err) => {
        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error',
          confirmButtonText: 'Acept'
        })
      })
  }



renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }

 async startApp() {
   await this.authService.googleInit();
    this.auth2 = this.authService.auth2;
    this.attachSignin( document.getElementById('my-signin2') );
  };

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.authService.loginGoogle(id_token)
          .subscribe( res => {
            this.ngZone.run(() => {
              this.router.navigateByUrl('/');
            })
          }
        );
      },(error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }



}

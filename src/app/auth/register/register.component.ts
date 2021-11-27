import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { fnSamePass } from '../validators/input-validation.validator';
import Swal  from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: any;
  public formSubmitted: boolean = false

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.loadForm()
  }

  ngOnInit(): void {
  }

  loadForm(){
    this.registerForm = new FormGroup({
      name: new FormControl ('', [Validators.required]),
      lastname: new FormControl ('', [Validators.nullValidator]),
      email: new FormControl ('test1111@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl ('', [Validators.required]),
      password2: new FormControl ('', [Validators.required]),
      terms: new FormControl (false, [Validators.requiredTrue])
    },
   { validators: fnSamePass}

    )
}

createUser() {
  this.formSubmitted = true
  if (this.registerForm.invalid) {
    console.log('soy invalido')
    return
  }
  this.authService.createUser(this.registerForm.value)
    .subscribe( res =>  {
      Swal.fire({
        title: 'Usuario creado!',
        text: 'Se ha registrado un nuevo usuario',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
     this.router.navigateByUrl('/')
    }, (err) => {
      Swal.fire({
        title: 'Error!',
        text: err.error.msg,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    })
}

invalidField( field: string): boolean {
  if (this.registerForm.get(field).invalid
    && this.formSubmitted){
      return true
    } else {
      return false
    }
}

aceptTerms(){
  return !this.registerForm.get('terms').value && this.formSubmitted;
}

invalidPassword(){
  const pass1 = this.registerForm.get('password').value;
  const pass2 = this.registerForm.get('password2').value

  if ((pass1 !== pass2) &&  this.formSubmitted ) {
    return true
  } else {
    return false
  }
}

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal  from 'sweetalert2';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: any;
  public uploadedImg: boolean = false;
  public imgTemp: any = null;
  public user!: User;
  public imgToUpload: File;

  constructor(
    private authService: AuthService,
    private fileUploadService: FileUploadService) {
    this.user = this.authService.user
  }

  loadForm() {
    this.profileForm = new FormGroup({
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      name: new FormControl(this.user.name, [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.loadForm();
  }

  updateProfile(){
    this.authService.updateProfile(this.profileForm.value)
      .subscribe((res) => {
        const { name, email } = this.profileForm.value
        this.user.name = name,
        this.user.email = email
        Swal.fire({
          title: 'Success!',
          text: 'User updated',
          icon: 'success',
          confirmButtonText: 'Acept'
        })
      },
      error => {
        console.log(error);
        Swal.fire('Error', error.error.msg, 'error');
      }
      )

  }

  changeImg($event: any){
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.imgToUpload = file
    if(! file ){
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  updateImgProfile(){
    const userId = this.user.uid
    this.fileUploadService.updateImg(this.imgToUpload, 'users', userId)
      .subscribe( (img: string | any ) => {
        this.user.img = img;
        Swal.fire(
          'Guardado',
          'Imagen de usuario actualizada',
          'success'
        );
      },
      error => {
        console.log(error);
        Swal.fire('Error', error, 'error');
      })
    }

  uploadImg(){
    console.log('Imagen subida exitosamente')
  }




}

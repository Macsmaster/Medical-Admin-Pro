import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { User } from 'src/app/shared/models/user.model';

import Swal  from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {

  public imgTemp: any = null
  public imgToUpload: File;
  public user!: User;





  constructor(
      public modalImageService: ModalImageService,
      public fileUploadService: FileUploadService,
      public authService: AuthService) {
        this.user = this.authService.user
       }

  ngOnInit(): void {
  }

  closeModal(){
    this.imgTemp = null;
    this.modalImageService.closeModal();
  }

  uploadImg(){

  }

  onChangeImg($event: any){
    console.log($event)
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
  const userId = this.modalImageService.uid;
  const type = this.modalImageService.type;

  this.fileUploadService.updateImg(this.imgToUpload, type, userId)

    .subscribe( (img: string | any ) => {
      Swal.fire(
        'Guardado',
        'Imagen de usuario actualizada',
        'success'
      );
      this.modalImageService.newImg.emit(img)
      this.closeModal();
    },


    error => {
      Swal.fire('Error', error, 'error');
    })
  }
}

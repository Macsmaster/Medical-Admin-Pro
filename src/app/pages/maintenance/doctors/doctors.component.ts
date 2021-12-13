import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import { Doctor } from 'src/app/shared/models/doctor.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  @ViewChild('txtTermino') txtTerm: ElementRef;

  public doctors: any = [];
  public totalRegisters: number = 0;
  public currentPage: number = 0;
  public imgSubs: Subscription;
  public doctorsTemp: any;
  public loading: boolean = true;

  constructor(
    private doctorService: DoctorService,
    private modalImageService: ModalImageService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.getDoctors();
    this.imgSubs = this.modalImageService.newImg
      .pipe(delay(100))
      .subscribe((img) => this.getDoctors());
  }

  ngOnDestroy() {
    this.imgSubs.unsubscribe;
  }

  getDoctors() {
    this.loading = true;
    this.doctorService.getDoctors(this.currentPage).subscribe(({ doctors, total }) => {
      this.loading = false;
      this.doctors = doctors;
      this.totalRegisters = total;
      this.doctorsTemp = doctors;
    });
  }

  openUpdateImgModal(doctor: Doctor) {
    this.modalImageService.openModal('doctors', doctor._id, doctor.img);
  }

  changePage(value: number) {
    this.currentPage += value;

    if (this.currentPage < 0) {
      this.currentPage = 0;
    } else if (this.currentPage > this.totalRegisters) {
      this.currentPage -= value;
    }
    this.getDoctors();
  }

  onSearchTerm(term: string) {
    if (term.length === 0) {
      return (this.doctors = this.doctorsTemp);
    }
    this.searchService.getBySearch('doctors', term).subscribe((res) => {
      this.doctors = res;
      console.log( this.doctors);
    });
  }

  onDeleteDoctor(doctor: Doctor) {
      Swal.fire({
        title: 'Estás seguro de eliminar al médico?',
        text: `Estas intentando eliminar al médico ${doctor.name}`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminalo!'
      }).then((result: any) => {
        if( result.value) {
          this.doctorService.deleteDoctor(doctor._id).subscribe( res => {
            console.log(res)
            this.getDoctors();
            Swal.fire(
              'Médico eliminado',
              `El médico ${doctor.name} ha sido eliminado`,
              'success'
            );
          });
        }
      })

  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { Hospital } from 'src/app/shared/models/hospital.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit, OnDestroy {
  public doctorForm: FormGroup;
  public doctorSelected: Doctor;
  public hospitalSelected: Hospital;
  public hospitals: Hospital[] = [];
  public totalResults: number = 0;
  public imgSubs: Subscription;
  public paramId: string;

  constructor(
    private hospitalService: HospitalService,
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalImageService: ModalImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.paramId = params.id;
    });
    this.getDoctor(this.paramId);

    this.imgSubs = this.modalImageService.newImg
      .pipe(delay(100))
      .subscribe((img) => this.getDoctor(this.paramId));

    this.getHospitals();
    this.loadForm();

    this.doctorForm.get('hospital').valueChanges.subscribe((hospitalId) => {
      this.hospitalSelected = this.hospitals.find(
        (hospital) => hospital._id === hospitalId
      );
    });
  }

  ngOnDestroy() {
    this.imgSubs.unsubscribe;
  }

  getDoctor(id: string) {
    if (id === 'new') {
      return;
    }

    this.doctorService
      .getDoctorById(id)
      .pipe(delay(100))
      .subscribe(
        (doctor) => {
          const {
            name,
            hospital: { _id },
          } = doctor;
          console.log(name, _id);
          this.doctorSelected = doctor;
          this.doctorForm.setValue({ name, hospital: _id });
        },
        (error) => {
          return this.router.navigateByUrl(`/dashboard/doctors`);
        }
      );
  }

  getHospitals() {
    this.hospitalService.getAllHospitals().subscribe(({ hospitals, total }) => {
      (this.hospitals = hospitals), (this.totalResults = total);
    });
  }

  loadForm() {
    this.doctorForm = this.fb.group({
      name: ['', [Validators.required]],
      hospital: ['', [Validators.required]],
    });
  }

  onOpenCreationModal() {
    const { name } = this.doctorForm.value;
    console.log(this.doctorSelected);
    if (this.doctorSelected) {
      const data = {
        ...this.doctorForm.value,
        _id: this.doctorSelected._id,
      };
      this.doctorService.updateDoctor(data).subscribe((res) => {
        Swal.fire(
          'Médico actualizado',
          `Se ha actualizado el médico ${name} satisfactoriamente.`,
          'success'
        );
      });
    } else {
      const data = this.doctorForm.value;
      const { nombre } = this.doctorForm.value;
      Swal.fire<any>({
        title: 'Crear médico',
        text: 'Se guardará el médico',
        showCancelButton: true,
        confirmButtonText: 'Crear',
        cancelButtonText: 'Cancelar',
      }).then((result: any) => {
        if (result.value) {
          this.doctorService
            .createDoctor(this.doctorForm.value)
            .subscribe((res: any) => {
              Swal.fire(
                'Médico guardado',
                'Se ha guardado el médico satisfactoriamente',
                'success'
              );
              this.router.navigateByUrl(`/dashboard/doctors/${res.doctor._id}`);
            });
        }
      });
    }
  }

  openUpdateImgModal(doctor: Doctor) {
    this.modalImageService.openModal('doctors', doctor._id, doctor.img);
  }
}

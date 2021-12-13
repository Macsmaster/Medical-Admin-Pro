import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import { Hospital } from 'src/app/shared/models/hospital.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit, OnDestroy {
  @ViewChild('txtTermino') txtTerm: ElementRef;

  public currentPage: number = 0;
  public totalRegisters: number = 0;

  public hospitals: any;
  public loading: boolean = true;
  public inputName: string = '';
  private imgSubs: Subscription;
  public hospitalsTemp: any;

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private searchService: SearchService) {
   }

  ngOnDestroy(){
    this.imgSubs.unsubscribe;
  }

  ngOnInit(): void {
    this.getHospitals();
    this.loading = true;

    this.imgSubs = this.modalImageService.newImg
      .pipe(delay(100))
      .subscribe(img => this.getHospitals());
  }

  getHospitals() {
    this.hospitalService.getAllHospitals(this.currentPage).subscribe(({ total, hospitals }) => {
      this.hospitalsTemp = hospitals;
      this.hospitals = hospitals;
      this.totalRegisters = total;
      this.loading = false;
    });

  }

  onSearchTerm(term: string){
    if (term.length === 0) {
      return (this.hospitals = this.hospitalsTemp);
    }

    this.searchService.getBySearch('hospitals', term).subscribe((res) => {
      console.log(res)
      this.hospitals = res;
    });
  }

  updateHospital(hospital: Hospital){
   this.hospitalService.updateHospital(hospital.name, hospital._id)
    .subscribe(res => {
      const msg = `Se ha actualizado el ${hospital.name} satisfactoriamente`
      Swal.fire('Hospital actualizado', msg, 'success')
      console.log(res)
    })
  }

  onDeleteHospital(hospital: Hospital) {
    const msg = `Se ha eliminado el ${hospital.name} satisfactoriamente`
    this.hospitalService.deleteHospital(hospital._id)
      .subscribe(res => {
        this.getHospitals();
        Swal.fire('Hospital eliminado', msg, 'success')
      });
  }

  async onOpenCreationModal(){
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingresa el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Ingresa el nombre',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar'
    });

     if ( value.length !== 0 ) {
       this.hospitalService.createHospital(value)
        .subscribe( ( res: any ) => {
          console.log(res)
          this.hospitals.push( res.hospital )
          Swal.fire('Hopital creado', 'Se ha creado el hospital satisfactoriamente', 'success');
        })
     }
  }

  changePage(value: number) {
    this.currentPage += value;

    if (this.currentPage < 0) {
      this.currentPage = 0;
    } else if (this.currentPage > this.totalRegisters) {
      this.currentPage -= value;
    }
    this.getHospitals();
  }

  openUpdateImgModal(hospital: Hospital){
    this.modalImageService.openModal(
      'hospitals',
      hospital._id,
      hospital.img
    );
  }

}

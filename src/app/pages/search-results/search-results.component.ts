import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { Doctor } from 'src/app/shared/models/doctor.model';
import { Hospital } from 'src/app/shared/models/hospital.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  public searchedWord: string = '';

  public doctors: Doctor[] = [];
  public users: User[] = [];
  public hospitals: Hospital[] = [];

  constructor( private activatedRoute: ActivatedRoute,
    private searchService: SearchService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({term}) => {
      this.getSearchResults(term);
    })

  }

  getSearchResults(term: string){
    this.searchService.getByGeneralSearch(term)
    .subscribe((res: any) => {
      this.doctors = res.doctors;
      this.hospitals = res.hospitals;
      this.users = res.users;
    })
  }

}

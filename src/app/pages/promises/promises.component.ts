import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css']
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

/*     const promise = new Promise((resolve, reject) => {
      
      if ( false ){
        resolve('hello world');
      }else {
        reject('Algo salio mal')
      }

    });
    promise
    .then((msj) => {
      console.log(msj)
    })
    .catch(error => console.log('error en la petición', error))
    console.log('Fin')
 */

    this.getUsers( ).then(pokemones => {
      console.log(pokemones)
    })
  }
  getUsers() {
    return new Promise((resolve, reject) => {
      fetch('https://pokeapi.co/api/v2/')
      .then(response => response.json())
      .then(body => resolve(body))
      .catch(reject => {
        console.log('Error en la petición', reject)
      })
    })
  }
}

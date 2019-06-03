import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso1: number = 10;
  progreso2: number = 30;

  constructor() { }

  ngOnInit() {
  }

  actualizar(event: number){
    // console.log('evento: ', event);
    this.progreso1 = event;
  }

}

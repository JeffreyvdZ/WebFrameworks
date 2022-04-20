import { Component, OnInit } from '@angular/core';
import {Scooter} from "../../../models/scooter";

@Component({
  selector: 'app-overview31',
  templateUrl: './overview31.component.html',
  styleUrls: ['./overview31.component.css']
})
export class Overview31Component implements OnInit {

  scooters: Scooter[];
  id: number;

  constructor() {
    this.scooters = [];
    this.id = 30000;
  }

  nextId(): number {
    this.id += Math.floor(Math.random() * (4-1) + 1)
    return this.id;
  }
  onNewScooter(){
    this.scooters.push(
      Scooter.createSampleScooter(this.nextId())
    )
  }

  ngOnInit(): void {
    for (let i = 0; i < 8; i++) {
      this.scooters.push(
        Scooter.createSampleScooter(this.nextId())
      )
    }
  }
}

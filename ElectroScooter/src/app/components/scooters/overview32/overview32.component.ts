import { Component, OnInit } from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {applySourceSpanToExpressionIfNeeded} from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-overview32',
  templateUrl: './overview32.component.html',
  styleUrls: ['./overview32.component.css']
})
export class Overview32Component implements OnInit {

  scooters: Scooter[];
  id: number;
  selectedScooter: Scooter;

  constructor() {
    this.scooters = [];
    this.id = 30000;
    this.selectedScooter = null;
  }

  nextId(): number {
    this.id += Math.floor(Math.random() * (4-1) + 1)
    return this.id;
  }

  onNewScooter(){
    this.scooters.push(
      Scooter.createSampleScooter(this.nextId())
    )
    this.selectedScooter = this.scooters[this.scooters.length-1];
  }

  onSelect(scooter: Scooter){
    this.selectedScooter = this.selectedScooter == scooter ? null : scooter
  }

  onDelete(scooter: Scooter){
    if(this.selectedScooter !== null){
      this.scooters = this.scooters.filter(scooter1 => scooter1.id !== scooter.id)
    }
    this.selectedScooter = null;
  }

  ngOnInit(): void {

    for (let i = 0; i < 8; i++) {
      this.scooters.push(
        Scooter.createSampleScooter(this.nextId())
      )
    }
  }
}

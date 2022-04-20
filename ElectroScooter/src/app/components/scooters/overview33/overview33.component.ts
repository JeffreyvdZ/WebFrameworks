import { Component, OnInit } from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";

@Component({
  selector: 'app-overview33',
  templateUrl: './overview33.component.html',
  styleUrls: ['./overview33.component.css']
})
export class Overview33Component implements OnInit {

  selectedScooter: Scooter;

  constructor(private scootersService: ScootersService) {
    this.selectedScooter = null;
  }

  ngOnInit(): void {

  }

  get scooters(): Scooter[] {
    return this.scootersService.scooters;
  }

  onNewScooter() {
    this.scootersService.save(
      Scooter.createSampleScooter()
    )
    this.selectedScooter = this.scootersService.scooters[this.scootersService.scooters.length - 1];
  }

  onSave(scooter: Scooter) {
    this.scootersService.save(scooter);
    this.selectedScooter = null;
  }

  onSelect(scooter: Scooter) {
    this.selectedScooter = this.selectedScooter == scooter ? null : scooter
  }

  onDelete(scooter: Scooter) {
    if (this.selectedScooter !== null) {
      this.scootersService.deleteById(scooter.id);
    }
    this.selectedScooter = null;
  }

  onCancel(scooter: Scooter) {
    this.selectedScooter = null;
  }
}



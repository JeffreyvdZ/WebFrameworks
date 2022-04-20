import {Component, OnInit} from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-overview34',
  templateUrl: './overview34.component.html',
  styleUrls: ['./overview34.component.css']
})
export class Overview34Component implements OnInit {

  id: number = 30000;
  removeButtonWhenFalse = true;

  constructor(public scootersService: ScootersService, private router: Router, private route: ActivatedRoute) {

  }

  get scooters(): Scooter[] {
    return this.scootersService.findAll();
  }

  ngOnInit(): void {
  }

  createNewScooter() {
    if (this.scooters.length < 16) {
      this.scootersService.selectedScooter = this.scootersService.save(Scooter.createSampleScooter());
      this.router.navigate([this.scootersService.selectedScooter.id], {
        relativeTo: this.route
      })
    } else {
      alert("Maximum amount of scooters added!");
      this.removeButtonWhenFalse = false;
    }
  }

  onClickScooterInList(scooter: Scooter) {

    if (scooter != null && scooter.id != this.scootersService.selectedScooter?.id) {
      this.router.navigate([scooter.id], {
        relativeTo: this.route
      })
    } else {
      this.router.navigate(['/scooters/overview34'])
      if (this.scootersService.selectedScooter === scooter) {
        this.scootersService.selectedScooter = null;
        return;
      }
    }
    this.scootersService.selectedScooter = scooter;
  }

}

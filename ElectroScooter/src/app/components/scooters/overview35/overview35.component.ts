import {Component, OnInit} from '@angular/core';
import {Scooter} from "../../../models/scooter";
import {ActivatedRoute, Router} from "@angular/router";
import {ScootersSbService} from "../../../services/scooters-sb.service";

@Component({
  selector: 'app-overview35',
  templateUrl: '../overview34/overview34.component.html',
  styleUrls: ['../overview34/overview34.component.css']
})
export class Overview35Component implements OnInit {

  id: number = 30000;
  removeButtonWhenFalse = true;
  scooters: Scooter[] = [];

  constructor(public scootersService: ScootersSbService, private router: Router, private route: ActivatedRoute) {
    this.getScooters();
  }

  getScooters() {
    this.scootersService.getAllScooters().subscribe(
      (data) => { this.scooters = data}
    )
  }

  ngOnInit(): void {
  }

  createNewScooter() {
    if (this.scooters.length < 16) {
      this.scootersService.save(Scooter.createSampleScooter()).subscribe(
        (data) => {
          this.scootersService.selectedScooter = Scooter.copyConstructor(data);
          this.getScooters();
          this.router.navigate([this.scootersService.selectedScooter.id],
            {relativeTo: this.route
        }) }, (error) => {
          alert('HTTP Error: Status ' +
            error.status + ' - ' + error.message);
        });

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
      this.router.navigate(['/scooters/overview35'])
      if (this.scootersService.selectedScooter === scooter) {
        this.scootersService.selectedScooter = null;
        return;
      }
    }
    this.scootersService.selectedScooter = scooter;
  }
}

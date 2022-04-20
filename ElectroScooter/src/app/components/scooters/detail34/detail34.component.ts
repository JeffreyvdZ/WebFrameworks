import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Scooter, ScooterStatus} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-detail34',
  templateUrl: './detail34.component.html',
  styleUrls: ['./detail34.component.css']
})
export class Detail34Component implements OnInit{


  copiedSelectedScooterFromOverview: Scooter;
  selectedScooterFromOverview: Scooter;
  statusArray: ScooterStatus[] = [];

  constructor(private scootersService: ScootersService, private route: ActivatedRoute, private router: Router) {
    this.statusArray = Scooter.statuses();
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.selectedScooterFromOverview = this.scootersService.findById(Number(params.id));
        this.copiedSelectedScooterFromOverview = Scooter.copyConstructor(this.selectedScooterFromOverview);
        this.scootersService.selectedScooter = this.selectedScooterFromOverview;
      })
  }

  checkChanges(): boolean {
    return JSON.stringify(this.copiedSelectedScooterFromOverview) === JSON.stringify(this.selectedScooterFromOverview)
  }

  setFieldsToNull() {
    this.copiedSelectedScooterFromOverview.tag = "";
    this.copiedSelectedScooterFromOverview.gpsLocation = "";
    this.copiedSelectedScooterFromOverview.mileage = null;
    this.copiedSelectedScooterFromOverview.batteryCharge = null;
  }

  onClickSave() {
    if (confirm("Are you sure you want to make this change?")){
      this.scootersService.save(this.copiedSelectedScooterFromOverview)
      this.deselect();
    }
  }

  onClickClear() {
    if (!this.checkChanges() && confirm("Are you sure to discard unsaved changes?")) {
      this.setFieldsToNull()
    } if (this.checkChanges()){
      this.setFieldsToNull()
    }
  }

  onClickReset() {
    if (confirm("Are you sure to discard unsaved changes?")) {
      this.copiedSelectedScooterFromOverview = Scooter.copyConstructor(this.selectedScooterFromOverview);
    }
  }

  onClickCancel() {
    if (!this.checkChanges() && confirm("Are you sure to discard unsaved changes?")) {
      this.deselect();
    } if(this.checkChanges()){
      this.scootersService.findById(this.copiedSelectedScooterFromOverview.id)
      this.deselect();
    }
  }

  onClickDelete() {
    if (confirm("Are you sure you want to delete this item?")) {
      this.scootersService.deleteById(this.copiedSelectedScooterFromOverview.id);
      this.deselect()
    }
  }

  deselect(){
    this.scootersService.selectedScooter = null;
    this.router.navigate(['/scooters/overview34']);
  }
}

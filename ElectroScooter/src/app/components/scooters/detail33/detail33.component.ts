import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Scooter, ScooterStatus} from "../../../models/scooter";
import {ScootersService} from "../../../services/scooters.service";

@Component({
  selector: 'app-detail33',
  templateUrl: './detail33.component.html',
  styleUrls: ['./detail33.component.css']
})
export class Detail33Component implements OnInit, OnChanges {
  @Input() selectedScooterFromOverview: Scooter;

  @Output() deleteScooter = new EventEmitter<Scooter>();
  @Output() saveScooter = new EventEmitter<Scooter>();
  @Output() cancelScooter = new EventEmitter<Scooter>();
  copyScooter: Scooter;

  constructor(private scootersService: ScootersService) {}

  ngOnInit(): void {
  }
  buttonDisabled(){
    return !this.selectedScooterFromOverview.equals(this.copyScooter);

  }
  ngOnChanges(){
    this.copyScooter = Scooter.copyConstructor(this.selectedScooterFromOverview);
  }

  statuses(){
    return Scooter.statuses();
  }

  onSaveScooter(){
    if(confirm("Do you want to save this Scooter?")) {
      this.saveScooter.emit(this.copyScooter);
    }
  }
  onClear(){
    if(confirm("Do you want to clear all fields?")){
      this.copyScooter.tag = null;
      this.copyScooter.status = ScooterStatus.INUSE;
      this.copyScooter.mileage = null;
      this.copyScooter.batteryCharge = null;
      this.copyScooter.gpsLocation = null;
    }
  }

  onResetScooter(){
    if(confirm("Do you want to discard your changes?")) {
      this.copyScooter = Scooter.copyConstructor(this.selectedScooterFromOverview);
    }
  }

  onCancel(){
    if(confirm("Do you want to discard your changes?")){
      this.cancelScooter.emit(this.copyScooter);
    }
  }

  onDeleteScooter(){
    if(confirm("Do you want to delete this scooter?")){
      this.deleteScooter.emit(this.copyScooter);
    }
  }
}

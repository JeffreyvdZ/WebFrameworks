import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Scooter} from "../../../models/scooter";

@Component({
  selector: 'app-detail32',
  templateUrl: './detail32.component.html',
  styleUrls: ['./detail32.component.css']
})
export class Detail32Component implements OnInit {
  @Input() selectedScooterFromOverview: Scooter;
  @Output() deleteScooter = new EventEmitter<Scooter>();
  @Output() scooterEdited: EventEmitter<Scooter> = new EventEmitter<Scooter>();

  constructor() { }


  ngOnInit(): void {

  }
  statuses(){
    return Scooter.statuses();
  }
  onDeleteScooter(scooter: Scooter){
    this.deleteScooter.emit(this.selectedScooterFromOverview);
  }
}

import { Injectable } from '@angular/core';
import {Scooter} from "../models/scooter";

@Injectable({
  providedIn: 'root'
})
export class ScootersService {
  private id: number = 30000;
  public scooters: Scooter[] = [];
  public selectedScooter: Scooter;

  constructor() {
    for (let i = 0; i < 8; i++) {
      this.save(Scooter.createSampleScooter(0));
    }
  }

  nextId(): number {
    this.id += Math.floor((Math.random() * 3)+1);
    return this.id;
  }

  public findAll(): Scooter[]{
    return this.scooters;
  }

  public findById(id: number): Scooter{
    for (let i = 0; i < this.scooters.length; i++) {
      if (this.scooters[i].id === id) {
        return this.scooters[i];
      }
    }
    return null;
  }

  public save(scooter: Scooter) {
    for (let i = 0; i < this.scooters.length; i++) {
      if(scooter.id === this.scooters[i].id){
        this.scooters[i] = scooter;
        return scooter;
      }
    }
    scooter.id = this.nextId();
    this.scooters.push(scooter);
    return scooter;
  }

  public deleteById(id: number){
    if(id!== null){
      this.scooters = this.scooters.filter(scooter => scooter.id !== id)
    }
  }
}

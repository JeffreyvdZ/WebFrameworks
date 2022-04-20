import { Injectable } from '@angular/core';
import {Scooter} from "../models/scooter";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ScootersSbService{
  public url: string = 'http://localhost:8085';
  public selectedScooter: Scooter;

  constructor(private http: HttpClient) {
  }

  public getAllScooters(): Observable<Scooter[]>{
    return this.restGetScooters();
  }

  public refresh(){
    window.location.reload()
  }

  public findById(id: number){
    return this.restGetScooters().pipe(
      map(scooters => scooters.find(i => i.id == id)))
  }

  public save(scooter: Scooter): Observable<Scooter> {
    if(scooter.id == 0) {
      return this.restPostScooter(scooter);
    } else {
      return this.restPutScooter(scooter.id, scooter);
    }
  }

  public deleteById(id: number): Observable<Scooter>{
    if(id!== null){
      return this.restDeleteScooter(id)
    }
    return null;
  }

  private restPutScooter(id: number, scooter: Scooter): Observable<Scooter> {
    return this.http.put<Scooter>(this.url + '/scooters/' + id,  scooter)
  }

  private restPostScooter(scooter: Scooter): Observable<Scooter> {
    return this.http.post<Scooter>(this.url + '/scooters', scooter)
  }

  private restDeleteScooter(id: number): Observable<Scooter>{
    return this.http.delete<Scooter>(this.url + '/scooters/' + id)
  }

  private restGetScooters(): Observable<Scooter[]>{
    return this.http.get<Scooter[]>(this.url + '/scooters')
  }
}

export enum ScooterStatus{
  IDLE= 'IDLE',
  INUSE= 'INUSE',
  MAINTENANCE= 'MAINTENANCE'
}

export class Scooter {

  constructor(public id?: number, public tag?: string, public status?: ScooterStatus, public gpsLocation?: string, public mileage?: number, public batteryCharge?: number){
  }

  static copyConstructor(scooter: Scooter) : Scooter{
    return scooter == null ? null : Object.assign(new Scooter(0), scooter);
  }
  static createRandomTag(){
    let randomTag        = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < 8; i++ ) {
      randomTag += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return randomTag;
  }
  static statuses(): ScooterStatus[]{
    return Object.values(ScooterStatus);
  }

  static createRandomStatus(){
    const enumArray = Object.values(ScooterStatus);
    const i = Math.floor(Math.random()*3);
    return enumArray[i];
  }

  equals(scooter: Scooter){
    return  this.id === scooter.id &&
            this.tag === scooter.tag &&
            this.batteryCharge === scooter.batteryCharge &&
            this.status === scooter.status &&
            this.gpsLocation === scooter.gpsLocation &&
            this.mileage === scooter.mileage
  }

  static createSampleScooter(pId = 0){ //TODO
    let randomTag = this.createRandomTag();
        let randomStatus = this.createRandomStatus();
        let latitude = (Math.random() * (53 - 52) + 52).toFixed(4);
        let longitude = (Math.random() * (5 - 4.8) + 4.8).toFixed(4);
        let randomGpsLocation = latitude + "N, " + longitude + "E";
        let randomMileage = Math.floor(Math.random() * (100000));
        let randomBatteryCharge = Math.floor(Math.random() * (101 - 5) + 5);
        if(randomStatus === ScooterStatus.INUSE){
          randomGpsLocation = '';
        }
        return new Scooter(pId, randomTag, randomStatus, randomGpsLocation, randomMileage, randomBatteryCharge)
  }
}

import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  selectedValue = '1';
  showLeidsepleinFilter = true;
  showHaarlemmerwegFilter = true;
  showAmstelveensewegFilter = true;
  showImages = true;
  approximateDurationHtml = "-"
  bikeLocationHtml = "Please select a bike-tour to see the additional information."
  activityInformation = "-";
  activity = "Activity:"

  ngOnInit(): void {
  }


  hideOnClickLeidseplein() {
    this.showHaarlemmerwegFilter = false;
    this.showAmstelveensewegFilter = false;
    this.showLeidsepleinFilter = true;
  }

  hideOnClickHaarlemmerweg() {
    this.showLeidsepleinFilter = false;
    this.showHaarlemmerwegFilter = true;
    this.showAmstelveensewegFilter = false;
  }

  hideOnClickAmstelveenseweg() {
    this.showLeidsepleinFilter = false;
    this.showHaarlemmerwegFilter = false;
    this.showAmstelveensewegFilter = true;
  }

  onClickImage($event: MouseEvent) {

    for (let i = 0; i < 10; i++) {
      if ($event.currentTarget == document.getElementById('image-' + i)){
        this.activity = "Canal Tour"
        this.activityInformation = "Tour around the Canals. Visit the old warehouses that helped Amsterdam become a great city!"
        if (i == 0 || i == 1 || i == 2){
          this.bikeLocationHtml = "Haarlemmerweg"
          this.approximateDurationHtml = "2 hours and 55 minutes"
        } else if (i == 3 || i == 4 || i ==5 || i == 6){
          this.bikeLocationHtml = "Leidseplein"
          this.approximateDurationHtml = "1 hours and 55 minutes"
        } else if (i == 7 || i == 8 || i == 9){
          this.bikeLocationHtml = "Amstelveenseweg"
          this.approximateDurationHtml = "55 minutes"
        }
      }
    }



  }


}

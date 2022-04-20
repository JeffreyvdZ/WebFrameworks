package app.models;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "ScooterType")
@NamedQueries({
  @NamedQuery(name = "scooter_find_by_status",
  query ="SELECT c FROM Scooter c WHERE c.status = ?1"),
  @NamedQuery(name = "scooter_find_by_battery",
    query ="SELECT c FROM Scooter c WHERE c.batteryCharge < ?1"),
  @NamedQuery(name = "trip_find_current_from_scooter",
    query ="SELECT t FROM Trip t LEFT JOIN Scooter c ON c.id = t.scooter.id WHERE c.status = 'INUSE'")
})
@Getter
@Setter
public abstract class Scooter {

  public enum ScooterStatus {
    IDLE,
    INUSE,
    MAINTENANCE
  }

  @Id
  @GeneratedValue
  @JsonView(ScooterView.OnlyIDTagStatusBatteryCharge.class)
  public long id;

  @JsonView(ScooterView.OnlyIDTagStatusBatteryCharge.class)
  public StringBuilder tag;

  @Enumerated(EnumType.STRING)
  @JsonView(ScooterView.OnlyIDTagStatusBatteryCharge.class)
  public ScooterStatus status;

  public String gpsLocation;

  public double mileage;

  @JsonView(ScooterView.OnlyIDTagStatusBatteryCharge.class)
  public double batteryCharge;

  @OneToMany(cascade = {CascadeType.ALL})
  @JsonManagedReference
  public List<Trip> trips;

  public boolean associateTrip(Trip trip) {
    if (this.trips == null) trips = new ArrayList<>();
    this.trips.add(trip);
    trip.associateScooter(this);
    return true;
  }

  public boolean dissociateTrip(List<Trip> trip) {
    this.trips = null;
    return true;
  }


  public Scooter() {

  }

  public Scooter(StringBuilder tag) {
    this.tag = tag;
    this.status = null;
    this.gpsLocation = null;
    this.mileage = 0.0;
    this.batteryCharge = 0;
    this.trips = null;
  }

  public Scooter(StringBuilder tag, ScooterStatus status, String gpsLocation, double mileage, double batteryCharge) {
    this.tag = tag;
    this.status = status;
    this.gpsLocation = gpsLocation;
    this.mileage = mileage;
    this.batteryCharge = batteryCharge;
    this.trips = null;
  }

  public static StringBuilder randomTag() {
    StringBuilder emptyString = new StringBuilder();
    String charachters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    int charactersLength = charachters.length();

    for (int i = 0; i < 8; i++) {
      emptyString.append(charachters.charAt((int) Math.floor(Math.random() *
        charactersLength)));
    }
    return emptyString;
  }

  public static Scooter createSampleScooter() {
    StringBuilder randomTag = randomTag();
    ScooterStatus status = ScooterStatus.values()[new Random().nextInt(ScooterStatus.values().length)];
    double latitude = (Math.random() * (53 - 52) + 52);
    double roundedLatitude = Math.round(latitude * 100.000) / 100.000;
    double longitude = (Math.random() * (5 - 4.8) + 4.8);
    double roundedLongitude = Math.round(longitude * 100.000) / 100.000;
    String randomGpsLocation = roundedLatitude + "N, " + roundedLongitude + "E";
    double randomMileage = Math.floor(Math.random() * 100000);
    double randomBatteryCharge = Math.round((Math.random() * (100 - 5) + 5) * 100.0) / 100.0;

    if (status == ScooterStatus.INUSE) {
      randomGpsLocation = "";
    }
    return new SharedScooter(randomTag, status, randomGpsLocation, randomMileage, randomBatteryCharge);
  }


}

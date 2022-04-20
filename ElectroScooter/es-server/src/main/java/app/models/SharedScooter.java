package app.models;

import javax.persistence.*;

@Entity
@DiscriminatorValue("S")
public class SharedScooter extends Scooter {
  @Column
  public boolean active;

  @ManyToOne
  @JoinColumn(name = "owner_id")
  public User owner;

  public SharedScooter() {}

  public SharedScooter(StringBuilder tag) {
    super(tag);
  }

  public SharedScooter(StringBuilder tag, ScooterStatus status, String gpsLocation, double mileage, double batteryCharge) {
    super(tag, status, gpsLocation, mileage, batteryCharge);
  }
}

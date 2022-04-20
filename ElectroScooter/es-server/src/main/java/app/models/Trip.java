package app.models;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Trip {
  @GeneratedValue
  @Id
  public long id;

  public LocalDateTime startDate;

  public LocalDateTime endDate;

  public LocalDateTime time;

  public String startPosition;

  public String endPosition;

  public double mileage;

  public double cost;

  @ManyToOne(cascade = CascadeType.ALL)
  @JsonBackReference
  @JoinColumn
  public Scooter scooter;

  public boolean associateScooter(Scooter scooter){
    this.scooter = scooter;
    return true;
  }
  public Trip(){}

  public Trip(Scooter scooter) {
    this.startDate = null;
    this.endDate = null;
    this.time = null;
    this.startPosition = null;
    this.endPosition = null;
    this.mileage = 2;
    this.cost = 3;
    this.scooter = scooter;
  }

}

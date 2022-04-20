package app;

import app.models.Scooter;
import app.models.Trip;
import app.repositories.ScooterRepositoryJpa;
import app.repositories.TripRepositoryJpa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {

  private ScooterRepositoryJpa scootersRepo;
  private TripRepositoryJpa tripsRepo;

  public DemoApplication(ScooterRepositoryJpa scootersRepo, TripRepositoryJpa tripsRepo) {
    this.scootersRepo = scootersRepo;
    this.tripsRepo = tripsRepo;
  }

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

  @Override
  public void run(String... args) throws Exception {
    System.out.println("Running CommandLine Startup");
    this.createInitialScooters();
  }

  public void createInitialScooters(){
    List<Scooter> scooters = this.scootersRepo.findAll();
    if(scooters != null && scooters.size() > 0) return;
    System.out.println("Configuring some initial scooter data");
    for (int i = 0; i < 7; i++) {
      Scooter scooter = Scooter.createSampleScooter();
      Trip trip = new Trip();
      Trip trip2 = new Trip();
      Trip trip3 = new Trip();
      scooter.associateTrip(trip);
      scooter.associateTrip(trip2);
      scooter.associateTrip(trip3);
      scootersRepo.save(scooter);
    }
  }
}

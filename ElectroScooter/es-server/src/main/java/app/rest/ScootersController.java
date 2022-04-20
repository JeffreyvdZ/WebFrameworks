package app.rest;
import app.models.Scooter;
import app.models.ScooterView;
import app.models.SharedScooter;
import app.models.Trip;
import app.repositories.ScooterRepositoryJpa;
import app.repositories.TripRepositoryJpa;
import com.fasterxml.jackson.annotation.JsonView;
import org.apache.coyote.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ScootersController implements WebMvcConfigurer {

  private ScooterRepositoryJpa scootersRepo;
  private TripRepositoryJpa tripsRepo;

  public ScootersController(ScooterRepositoryJpa scootersRepo, TripRepositoryJpa tripsRepo) {
    this.scootersRepo = scootersRepo;
    this.tripsRepo = tripsRepo;
  }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
      registry.addMapping("/**")
        .allowedOrigins("http://localhost:4200")
        .allowedMethods("GET", "POST", "PUT", "DELETE")
        .allowedHeaders(HttpHeaders.AUTHORIZATION, HttpHeaders.CONTENT_TYPE)
        .exposedHeaders(HttpHeaders.AUTHORIZATION, HttpHeaders.CONTENT_TYPE)
        .allowCredentials(true);
    }


//  @GetMapping("/testscooters")
//  public List<Scooter> getTwoScooters() {
//    return List.of(
//      new Scooter(new StringBuilder("Test-scooter-A")),
//      new Scooter(new StringBuilder("Test-scooter-B"))
//    );
//  }

  @GetMapping("/scooters")
  public List<Scooter> getAllScooters(@RequestParam(value = "battery",required = false) Double batteryCharge,
                                      @RequestParam(value = "status",required = false) Scooter.ScooterStatus scooterStatus){
    if(batteryCharge != null){
      return scootersRepo.findByQuery("scooter_find_by_battery", batteryCharge);
    }
    if(scooterStatus != null){
//      if(!Arrays.asList(Scooter.ScooterStatus.values()).contains(scooterStatus)){
//        throw new ConditionFailedException("Status = "+scooterStatus+" is not a valid scooter status value");
//      }
      return  scootersRepo.findByQuery("scooter_find_by_status", scooterStatus);
    } else {
      return scootersRepo.findAll();
    }
  }

  @GetMapping("/scooters/currenttrips")
  public List<Trip> getAllTrips() {
    return tripsRepo.findByQuery("trip_find_current_from_scooter", null);
  }

  @JsonView(ScooterView.OnlyIDTagStatusBatteryCharge.class)
  @GetMapping("/scooters/summary")
  public List<Scooter> getScootersSummary() {
    return scootersRepo.findAll();
  }


  @GetMapping("/scooters/{id}")
  public Scooter getScooterById(@PathVariable long id) {
    Scooter scooter = scootersRepo.findById(id);
    if (scooter == null) {
      throw new ScooterNotFoundException("" + id);
    }
    return scooter;
  }

  @RequestMapping(method = RequestMethod.POST, value = "/scooters")
  public ResponseEntity<Scooter> saveScooter(@RequestBody Scooter scooter) {
    Scooter scooter1 = scootersRepo.save(scooter);
    URI location = ServletUriComponentsBuilder.
      fromCurrentRequest().path("/{id}").
      buildAndExpand(scooter1.getId()).toUri();

    return ResponseEntity.created(location)
      .body(scooter1);
  }


  @RequestMapping(method = RequestMethod.POST, value = "/scooters/{scooterId}/trips")
  public ResponseEntity<Scooter> saveTripToScooter(@PathVariable long scooterId, @RequestBody Trip trip) {
    if (trip.startDate == null) trip.startDate = LocalDateTime.now();
    Scooter scooter = scootersRepo.findById(scooterId);
    if (scooter.status == Scooter.ScooterStatus.IDLE || scooter.batteryCharge < 10) {
      throw new ConditionFailedException("Scooter can't be used at the moment");
    }
    trip.setStartPosition(scooter.getGpsLocation());
    scooter.setStatus(Scooter.ScooterStatus.INUSE);
    scooter.associateTrip(trip);
    Scooter scooter2 = scootersRepo.save(scooter);
    URI location = ServletUriComponentsBuilder.
      fromCurrentRequest().path("").
      buildAndExpand(scooter2.getId()).toUri();
    return ResponseEntity.created(location)
      .body(scooter2);
  }

//  @RequestMapping(method = RequestMethod.POST, value = "/users/:user-id/shared-scooters")
//  public ResponseEntity<SharedScooter> saveSharedScooter(@RequestBody SharedScooter sharedScooter) {
//
//  }

  @RequestMapping(method = RequestMethod.PUT, value = "/scooters/{id}")
  public ResponseEntity<Scooter> updateScooter(@PathVariable long id, @RequestBody Scooter scooter) {
    if (id == scooter.getId()){
      Scooter scooter1 = scootersRepo.save(scooter);

      URI location = ServletUriComponentsBuilder.
        fromCurrentRequest().path("/{id}").
        buildAndExpand(scooter1.getId()).toUri();

      return ResponseEntity.created(location)
        .body(scooter1);
    } else {
      throw new ConditionFailedException("Scooter Id: " + id + " does not match path parameter= "+scooter.getId() );
    }
  }

  @DeleteMapping("/scooters/{id}")
  public ResponseEntity<?> deleteScooter(@PathVariable long id) {
    Scooter scooter = scootersRepo.deleteById(id);

    if (scooter == null) {
      throw new ScooterNotFoundException("" + id);
    }

    return ResponseEntity.ok(scooter);
  }

  @ResponseStatus(HttpStatus.NOT_FOUND)
  public static class ScooterNotFoundException extends RuntimeException {

    public ScooterNotFoundException(String s) {
      super("id: " + s + " is not a scooter.");
    }
  }

  @ResponseStatus(HttpStatus.PRECONDITION_FAILED)
  public static class ConditionFailedException extends RuntimeException {

    public ConditionFailedException(String s) {
      super(s);
    }
  }


}



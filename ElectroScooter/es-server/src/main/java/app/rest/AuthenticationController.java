package app.rest;

import app.models.User;
import app.repositories.ScooterRepositoryJpa;
import app.repositories.TripRepositoryJpa;
import app.security.APIConfig;
import app.security.JWToken;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.NotAcceptableStatusException;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController implements WebMvcConfigurer {

  private ScooterRepositoryJpa scootersRepo;
  private TripRepositoryJpa tripsRepo;
  private APIConfig apiConfig;



  public AuthenticationController(ScooterRepositoryJpa scootersRepo, TripRepositoryJpa tripsRepo, APIConfig apiConfig) {
    this.scootersRepo = scootersRepo;
    this.tripsRepo = tripsRepo;
    this.apiConfig = apiConfig;
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
  @RequestMapping(method = RequestMethod.POST, path = "/authentication/login")
  public ResponseEntity<User> saveTripToScooter(@RequestBody ObjectNode signOnInfo) {

    String userEmail = signOnInfo.get("email").asText();
    String userPassword = signOnInfo.get("password").asText();
    String name = userEmail.replaceAll("((@.*)|[^a-zA-Z])+", " ").trim();

    if(userPassword.equals(name)){

      User user = new User(userEmail, userPassword, "registered user");
      JWToken jwToken = new JWToken(name, user.getId(), user.getRole());
      String tokenString = jwToken.encode(this.apiConfig.getPassphrase(), this.apiConfig.getIssuer(), this.apiConfig.getExpiration());

      return ResponseEntity.accepted()
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenString).body(user);
    } else {
      throw new NotAcceptableStatusException("Not acceptable");
    }
  }
}

package app.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class APIConfig {

  public final Set<String> SECURED_PATHS = Set.of("/scooters", "/testscooters");

  @Value("${jwt.issuer:MyOrganisation}")
  private String issuer;

  @Value("${jwt.pass-phrase}")
  private String passphrase;

  @Value("${jwt.expiration-seconds}")
  private int expiration;



  public String getIssuer() {
    return issuer;
  }

  public void setIssuer(String issuer) {
    this.issuer = issuer;
  }

  public String getPassphrase() {
    return passphrase;
  }

  public void setPassphrase(String passphrase) {
    this.passphrase = passphrase;
  }

  public int getExpiration() {
    return expiration;
  }

  public void setExpiration(int expiration) {
    this.expiration = expiration;
  }
}

package app.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {
  @Id
//  @GeneratedValue
  @Column(name = "id", nullable = false)
  private Long id;

  private String name;
  private String email;
  private String hashedPassword;
  private String role;

  public User() {
  }

  public User(String email, String hashedPassword, String role) {
    this.id = 0L; //testdata
    this.name = email.replaceAll("((@.*)|[^a-zA-Z])+", " ").trim();
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.role = role;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getHashedPassword() {
    return hashedPassword;
  }

  public void setHashedPassword(String hashedPassword) {
    this.hashedPassword = hashedPassword;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }
}

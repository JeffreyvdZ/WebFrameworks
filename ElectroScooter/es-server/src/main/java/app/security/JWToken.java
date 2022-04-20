package app.security;


import io.jsonwebtoken.*;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

public class JWToken {
  private static final String JWT_CALLNAME_CLAIM = "sub";
  private static final String JWT_USERID_CLAIM = "id";
  private static final String JWT_ROLE_CLAIM = "role";

  private String callName;
  private Long userId;
  private String role;


  public JWToken(String callName, Long userId, String role) {
    this.callName = callName;
    this.userId = userId;
    this.role = role;
  }

  public String encode(String passphrase, String issuer, int expiration) {
    Key key = getKey(passphrase);

    return Jwts.builder()
      .claim(JWT_CALLNAME_CLAIM, this.callName)
      .claim(JWT_USERID_CLAIM, this.userId)

      .claim(JWT_ROLE_CLAIM, this.role)
      .setIssuer(issuer)
      .setIssuedAt(new Date())
      .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000L))
      .signWith(key, SignatureAlgorithm.HS512)
      .compact();
  }

  private static Key getKey(String passPhrase) {
    byte[] hmacKey = passPhrase.getBytes(StandardCharsets.UTF_8);
    return new SecretKeySpec(hmacKey, SignatureAlgorithm.HS512.getJcaName());
  }

  public static JWToken decode(String token, String passphrase) throws ExpiredJwtException, MalformedJwtException {
    Key key = getKey(passphrase);
    Jws<Claims> jws = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
    Claims claims = jws.getBody();

    return new JWToken(
      claims.get(JWT_CALLNAME_CLAIM).toString(),
      Long.valueOf(claims.get(JWT_USERID_CLAIM).toString()),
      claims.get(JWT_ROLE_CLAIM).toString()
    );
  }
}


package app.security;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JWTRequestFilter extends OncePerRequestFilter {

  private APIConfig apiConfig;

  public JWTRequestFilter(APIConfig apiConfig) {
    this.apiConfig = apiConfig;
  }

  @Override
  public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
    throws ServletException, IOException {

    String servletPath = request.getServletPath();

    if(HttpMethod.OPTIONS.matches(request.getMethod()) || this.apiConfig.SECURED_PATHS.stream().noneMatch(servletPath::startsWith)){
      filterChain.doFilter(request, response);
      return;
    }

    String encryptedToken = request.getHeader(HttpHeaders.AUTHORIZATION);

    if(encryptedToken == null){
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "No token provided. You need to logon first.");
      return;
    }
    try{
      JWToken jwToken = JWToken.decode(encryptedToken.replace("Bearer ", ""), this.apiConfig.getPassphrase());
      request.setAttribute("", jwToken);
      filterChain.doFilter(request, response);
    } catch (RuntimeException e) {
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage() + " You need to logon first.");
      return;
    }
  }
}

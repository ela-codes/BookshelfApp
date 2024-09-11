package com.springjwt.Bookshelf.config;

import com.springjwt.Bookshelf.model.CustomUserDetails;
import com.springjwt.Bookshelf.service.CustomUserDetailsService;
import com.springjwt.Bookshelf.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
// Custom filter that will add JWT token to every FIRST UNIQUE request
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    ApplicationContext appContext;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        // The request object will have a header containing the Bearer
        // Example: Bearer eyJhbGciOiJIUzI1NiJ9.yyyyy.zzzzz

        // extract the Authorization header from the request, where the JWT token is located
        String authHeader = request.getHeader("Authorization");

        // initialize as null to signify that it has no data yet
        String token = null;
        String username = null;
        String credentials = null;

        // check that there is authorization header and that it includes "Bearer"
        if(authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7); // take the Base64Url
            username = jwtService.extractUsername(token); // username can be found in the JWT payload
        }

        // only authenticate users if they haven't already been authenticated
        // SecurityContextHolder holds the security context of the current user, the user’s authentication details
        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // find and get the user from database then load it into userDetails
            UserDetails userDetails = appContext.getBean(CustomUserDetailsService.class).loadUserByUsername(username);


            if(jwtService.validateToken(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                credentials,
                                userDetails.getAuthorities()
                        );
                // WebAuthenticationDetailsSource is a utility class that helps create WebAuthenticationDetails
                // objects based on incoming HTTP requests
                // It provides a way to extract and store authentication details from the HttpServletRequest
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
                // After successful authentication, it becomes an authenticated token
                // containing the UserDetails and is then stored in the SecurityContextHolder
                // to represent the authenticated principal for the current request
            }
        }
        filterChain.doFilter(request, response);
    }
}

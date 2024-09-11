package com.springjwt.Bookshelf.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private String key = "";

    public JwtService() {
        // this constructor will create a base64-encoded key and store it as String
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey secretKey = keyGen.generateKey();
            this.key = Base64.getEncoder().encodeToString(secretKey.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    private SecretKey getKey() {
        // using the base64-encoded key,
        // generate a cryptographic key for signing a JWT using the HMAC-SHA algorithm

        // it needs to be in a bytes array (binary form)
        byte[] keyBytes = Decoders.BASE64.decode(key);

        // creates an HMAC-SHA key from the keyBytes array, used for signing the JWT
        return Keys.hmacShaKeyFor(keyBytes);
    }


    public String generateToken(String username) {
        // Create a map to store claims (additional information about the user)
        Map<String, Object> claims = new HashMap<>(); // empty for now

        return Jwts
                .builder()
                // Claims are additional pieces of data included in the token (start with an empty claim)
                .claims()
                .add(claims)  // Claims are added to the token
                // Set the subject of the token (usually the username or user ID)
                .subject(username)
                // Set the time the token was issued
                .issuedAt(new Date(System.currentTimeMillis()))
                // Set the expiration time for the token (current time + 60 minutes)
                .expiration(new Date(System.currentTimeMillis() + (60 * 60 * 60)))
                // Sign the token with a secret key
                .and()
                .signWith(getKey())  // Signing the token to ensure its integrity
                // Generate the final compact JWT string
                .compact();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser() //  initializes the JWT parser
                .verifyWith(getKey()) // ensures that the token hasn't been tampered with
                .build() // Builds the parser with the necessary settings (like the verification key)
                .parseSignedClaims(token) // Parses the token and extracts the claims
                .getPayload(); // Extracts the actual payload (claims) from the token
    }

    // helper function for checking a specific part of the Claims object
    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }
}
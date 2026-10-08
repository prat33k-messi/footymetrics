package com.example.footymetrics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000"})
public class UserController {

    @Autowired
    private UserRepository ur;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users u) {
        Users existingUser = ur.findByUsername(u.getUsername());
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("username already exists");
        }
        ur.save(u);
        return ResponseEntity.status(HttpStatus.OK).body("registration done");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginData l) {
        Users user = ur.findByUsername(l.getUsername());
        if (user != null && user.getPassword() != null && user.getPassword().equals(l.getPassword())) {
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalid credentials");
    }

    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestBody UpdatePassword up) {
        Users user = ur.findByUsername(up.getUsername());
        if (user != null && user.getPassword() != null && user.getPassword().equals(up.getPassword())) {
            user.setPassword(up.getNpassword());
            ur.save(user);
            return ResponseEntity.status(HttpStatus.OK).body("password updated successfully");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalid credentials");
    }

    @PostMapping("/delete")
    public ResponseEntity<?> delete(@RequestBody DeleteData d) {
        Users user = ur.findByUsername(d.getUsername());
        if (user != null && user.getPassword() != null && user.getPassword().equals(d.getPassword())) {
            ur.delete(user);
            return ResponseEntity.status(HttpStatus.OK).body("account deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalid credentials");
    }
}

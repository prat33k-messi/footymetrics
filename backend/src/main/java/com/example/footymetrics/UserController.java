package com.example.footymetrics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000", "*"})
public class UserController {

    @Autowired
    private UserRepository ur;

    @Autowired
    private MarksRepository mr;

    @Autowired
    private MatchLogRepository mlr;

    // --- Authentication Endpoints ---

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users u) {
        Users existingUser = ur.findByUsername(u.getUsername());
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("username already exists");
        }
        Users saved = ur.save(u);
        // Initialize default career stats (marks)
        Marks initialMarks = new Marks();
        initialMarks.setXyz(saved.getXyz());
        initialMarks.setMaths(0);
        initialMarks.setPhysics(0);
        initialMarks.setChemistry(0);
        mr.save(initialMarks);

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
            mr.deleteById(user.getXyz());
            ur.delete(user);
            return ResponseEntity.status(HttpStatus.OK).body("account deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalid credentials");
    }

    // --- Feature 1: Performance Stats & Analytics Engine ---

    @GetMapping("/stats/{username}")
    public ResponseEntity<?> getPlayerStats(@PathVariable String username) {
        Users user = ur.findByUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("player not found");
        }

        Marks marks = mr.findById(user.getXyz()).orElseGet(() -> {
            Marks defaultMarks = new Marks(user.getXyz(), 0, 0, 0);
            return mr.save(defaultMarks);
        });

        PlayerStatsResponse response = new PlayerStatsResponse(
                user.getXyz(),
                user.getUsername(),
                user.getEmail(),
                user.getBranch(),
                user.getRole(),
                marks.getMaths(),
                marks.getPhysics(),
                marks.getChemistry()
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/marks/update")
    public ResponseEntity<?> updateMarks(@RequestBody MarksDto dto) {
        Users user = ur.findByUsername(dto.getUsername());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("player not found");
        }

        Marks marks = mr.findById(user.getXyz()).orElse(new Marks());
        marks.setXyz(user.getXyz());
        marks.setMaths(dto.getMaths());
        marks.setPhysics(dto.getPhysics());
        marks.setChemistry(dto.getChemistry());
        mr.save(marks);

        PlayerStatsResponse response = new PlayerStatsResponse(
                user.getXyz(),
                user.getUsername(),
                user.getEmail(),
                user.getBranch(),
                user.getRole(),
                marks.getMaths(),
                marks.getPhysics(),
                marks.getChemistry()
        );
        return ResponseEntity.ok(response);
    }

    // --- Feature 2: Scouting Directory & Global Leaderboard ---

    @GetMapping("/players")
    public ResponseEntity<?> getAllPlayers() {
        List<Users> users = ur.findAll();
        List<PlayerSummaryDto> summaries = new ArrayList<>();

        for (Users u : users) {
            Optional<Marks> mOpt = mr.findById(u.getXyz());
            int g = mOpt.map(Marks::getMaths).orElse(0);
            int a = mOpt.map(Marks::getPhysics).orElse(0);
            int m = mOpt.map(Marks::getChemistry).orElse(0);
            PlayerStatsResponse temp = new PlayerStatsResponse(u.getXyz(), u.getUsername(), u.getEmail(), u.getBranch(), u.getRole(), g, a, m);
            summaries.add(new PlayerSummaryDto(u.getXyz(), u.getUsername(), u.getEmail(), u.getBranch(), u.getRole(), g, a, m, temp.getPerformanceRating()));
        }
        return ResponseEntity.ok(summaries);
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<?> getLeaderboard() {
        List<Users> users = ur.findAll();
        List<PlayerSummaryDto> summaries = new ArrayList<>();

        for (Users u : users) {
            Optional<Marks> mOpt = mr.findById(u.getXyz());
            int g = mOpt.map(Marks::getMaths).orElse(0);
            int a = mOpt.map(Marks::getPhysics).orElse(0);
            int m = mOpt.map(Marks::getChemistry).orElse(0);
            PlayerStatsResponse temp = new PlayerStatsResponse(u.getXyz(), u.getUsername(), u.getEmail(), u.getBranch(), u.getRole(), g, a, m);
            summaries.add(new PlayerSummaryDto(u.getXyz(), u.getUsername(), u.getEmail(), u.getBranch(), u.getRole(), g, a, m, temp.getPerformanceRating()));
        }

        // Sort descending by performance rating and goals
        summaries.sort((p1, p2) -> {
            int comp = Double.compare(p2.getPerformanceRating(), p1.getPerformanceRating());
            if (comp != 0) return comp;
            return Integer.compare(p2.getGoals(), p1.getGoals());
        });

        return ResponseEntity.ok(summaries);
    }

    // --- Feature 3: Match Logger & History ---

    @PostMapping("/matches/log")
    public ResponseEntity<?> logMatch(@RequestBody MatchLogRequest req) {
        Users user = ur.findByUsername(req.getUsername());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("player not found");
        }

        MatchLog log = new MatchLog(
                user.getXyz(),
                user.getUsername(),
                req.getOpponent(),
                req.getGoals(),
                req.getAssists(),
                req.getResult() != null ? req.getResult().toUpperCase() : "WIN",
                req.getMatchDate() != null ? req.getMatchDate() : "Recent",
                req.getNotes()
        );
        mlr.save(log);

        // Auto-increment career marks
        Marks marks = mr.findById(user.getXyz()).orElse(new Marks(user.getXyz(), 0, 0, 0));
        marks.setMaths(marks.getMaths() + req.getGoals());
        marks.setPhysics(marks.getPhysics() + req.getAssists());
        marks.setChemistry(marks.getChemistry() + 1);
        mr.save(marks);

        return ResponseEntity.ok(log);
    }

    @GetMapping("/matches/{username}")
    public ResponseEntity<?> getPlayerMatches(@PathVariable String username) {
        List<MatchLog> logs = mlr.findByUsernameOrderByIdDesc(username);
        return ResponseEntity.ok(logs);
    }
}

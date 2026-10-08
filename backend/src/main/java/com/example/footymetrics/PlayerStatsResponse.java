package com.example.footymetrics;

public class PlayerStatsResponse {
    private int userId;
    private String username;
    private String email;
    private String branch;
    private String role;
    private int goals;          // maths
    private int assists;        // physics
    private int matches;        // chemistry
    private double goalsPerMatch;
    private int totalContributions;
    private double performanceRating;

    public PlayerStatsResponse() {
    }

    public PlayerStatsResponse(int userId, String username, String email, String branch, String role,
                               int goals, int assists, int matches) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.branch = branch;
        this.role = role;
        this.goals = goals;
        this.assists = assists;
        this.matches = matches;
        this.totalContributions = goals + assists;
        this.goalsPerMatch = matches > 0 ? Math.round(((double) goals / matches) * 100.0) / 100.0 : 0.0;
        
        // Calculated rating out of 10.0: baseline 6.0 + goal weight + assist weight capped at 9.9
        double calculated = 6.0;
        if (matches > 0) {
            calculated += ((goals * 1.5 + assists * 1.0) / matches) * 2.0;
        }
        if (calculated > 9.9) calculated = 9.9;
        if (calculated < 5.0 && matches > 0) calculated = 5.0;
        this.performanceRating = Math.round(calculated * 10.0) / 10.0;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getGoals() {
        return goals;
    }

    public void setGoals(int goals) {
        this.goals = goals;
    }

    public int getAssists() {
        return assists;
    }

    public void setAssists(int assists) {
        this.assists = assists;
    }

    public int getMatches() {
        return matches;
    }

    public void setMatches(int matches) {
        this.matches = matches;
    }

    public double getGoalsPerMatch() {
        return goalsPerMatch;
    }

    public void setGoalsPerMatch(double goalsPerMatch) {
        this.goalsPerMatch = goalsPerMatch;
    }

    public int getTotalContributions() {
        return totalContributions;
    }

    public void setTotalContributions(int totalContributions) {
        this.totalContributions = totalContributions;
    }

    public double getPerformanceRating() {
        return performanceRating;
    }

    public void setPerformanceRating(double performanceRating) {
        this.performanceRating = performanceRating;
    }
}

package com.example.footymetrics;

public class PlayerSummaryDto {
    private int xyz;
    private String username;
    private String email;
    private String branch;
    private String role;
    private int goals;
    private int assists;
    private int matches;
    private double performanceRating;

    public PlayerSummaryDto() {
    }

    public PlayerSummaryDto(int xyz, String username, String email, String branch, String role, int goals, int assists, int matches, double performanceRating) {
        this.xyz = xyz;
        this.username = username;
        this.email = email;
        this.branch = branch;
        this.role = role;
        this.goals = goals;
        this.assists = assists;
        this.matches = matches;
        this.performanceRating = performanceRating;
    }

    public int getXyz() {
        return xyz;
    }

    public void setXyz(int xyz) {
        this.xyz = xyz;
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

    public double getPerformanceRating() {
        return performanceRating;
    }

    public void setPerformanceRating(double performanceRating) {
        this.performanceRating = performanceRating;
    }
}

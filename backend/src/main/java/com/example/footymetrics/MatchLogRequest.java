package com.example.footymetrics;

public class MatchLogRequest {
    private String username;
    private String opponent;
    private int goals;
    private int assists;
    private String result;     // WIN, DRAW, LOSS
    private String matchDate;
    private String notes;

    public MatchLogRequest() {
    }

    public MatchLogRequest(String username, String opponent, int goals, int assists, String result, String matchDate, String notes) {
        this.username = username;
        this.opponent = opponent;
        this.goals = goals;
        this.assists = assists;
        this.result = result;
        this.matchDate = matchDate;
        this.notes = notes;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getOpponent() {
        return opponent;
    }

    public void setOpponent(String opponent) {
        this.opponent = opponent;
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

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getMatchDate() {
        return matchDate;
    }

    public void setMatchDate(String matchDate) {
        this.matchDate = matchDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}

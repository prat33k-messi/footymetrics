package com.example.footymetrics;

public class MarksDto {
    private String username;
    private int maths;      // Goals
    private int physics;    // Assists
    private int chemistry;  // Matches

    public MarksDto() {
    }

    public MarksDto(String username, int maths, int physics, int chemistry) {
        this.username = username;
        this.maths = maths;
        this.physics = physics;
        this.chemistry = chemistry;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getMaths() {
        return maths;
    }

    public void setMaths(int maths) {
        this.maths = maths;
    }

    public int getPhysics() {
        return physics;
    }

    public void setPhysics(int physics) {
        this.physics = physics;
    }

    public int getChemistry() {
        return chemistry;
    }

    public void setChemistry(int chemistry) {
        this.chemistry = chemistry;
    }
}

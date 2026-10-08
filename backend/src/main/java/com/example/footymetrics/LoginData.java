package com.example.footymetrics;

public class LoginData {
    public String username;
    public String password;
    public String branch;
    public String role;

    public LoginData() {
    }

    public LoginData(String username, String password, String branch, String role) {
        this.username = username;
        this.password = password;
        this.branch = branch;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
}

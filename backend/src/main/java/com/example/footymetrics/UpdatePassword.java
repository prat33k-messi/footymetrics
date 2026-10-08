package com.example.footymetrics;

public class UpdatePassword {
    public String username;
    public String password;
    public String npassword;

    public UpdatePassword() {
    }

    public UpdatePassword(String username, String password, String npassword) {
        this.username = username;
        this.password = password;
        this.npassword = npassword;
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

    public String getNpassword() {
        return npassword;
    }

    public void setNpassword(String npassword) {
        this.npassword = npassword;
    }
}

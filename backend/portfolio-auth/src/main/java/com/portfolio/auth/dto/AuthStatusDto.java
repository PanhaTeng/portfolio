package com.portfolio.auth.dto;

public class AuthStatusDto {

    private boolean authenticated;
    private String username;
    private String role;

    public AuthStatusDto() {
    }

    public AuthStatusDto(boolean authenticated, String username, String role) {
        this.authenticated = authenticated;
        this.username = username;
        this.role = role;
    }

    public static AuthStatusDto unauthenticated() {
        return new AuthStatusDto(false, null, null);
    }

    public static AuthStatusDto authenticated(String username, String role) {
        return new AuthStatusDto(true, username, role);
    }

    public boolean isAuthenticated() {
        return authenticated;
    }

    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}

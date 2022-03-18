package com.komfortcieplny.InstalBase.security;

public enum ApplicationUserPermission {
    MATERIAL_READ("material:read"),
    MATERIAL_WRITE("material:write"),
    MATERIAL_ADD("material:add");

    private final String permission;

    ApplicationUserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}

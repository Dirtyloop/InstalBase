package com.komfortcieplny.InstalBase.security;

import com.google.common.collect.Sets;

import java.util.Set;

import static com.komfortcieplny.InstalBase.security.ApplicationUserPermission.*;

public enum ApplicationUserRole {
    WORKER(Sets.newHashSet()),
    ADMIN(Sets.newHashSet(MATERIAL_READ, MATERIAL_WRITE, MATERIAL_ADD));

    private final Set<ApplicationUserPermission> permissions;

    ApplicationUserRole(Set<ApplicationUserPermission> permissions) {
        this.permissions = permissions;
    }

    public Set<ApplicationUserPermission> getPermissions() {
        return permissions;
    }
}

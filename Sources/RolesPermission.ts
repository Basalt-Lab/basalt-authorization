import { IRolePermissions } from "@/Interfaces/IRolePermissions";
import { IRawRolePermission } from '@/Interfaces/IRawRolePermission';

export class RolesPermission {
    private _rolesPermission: IRolePermissions = {};

    /**
     * Add a role with permissions
     * @param role
     * @param permissions
     * @throws Error if role already exists
     */
    public addRole(role: string, permissions: string[] = []): void {
        if(this._rolesPermission[role])
            throw new Error(`Role ${role} already exists`);
        this._rolesPermission[role] = permissions;
    }

    /**
     * Add multiple roles with permissions
     * @param roles
     * @throws Error if one of the roles already exists
     */
    public addRoles(roles: string[]): void {
        for (const role of roles) {
            if (this._rolesPermission[role])
                throw new Error(`Role ${role} already exists`);
            this.addRole(role);
        }
    }

    /**
     * Add a permission to a role
     * @param role
     * @param permission
     * @throws Error if role does not exist
     * @throws Error if permission already exists
     */
    public addPermission(role: string, permission: string): void {
        if(!this._rolesPermission[role])
            throw new Error(`Role ${role} does not exist`);
        if(this._rolesPermission[role].includes(permission))
            throw new Error(`Permission ${permission} already exists`);
        this._rolesPermission[role].push(permission);
    }

    /**
     * Add multiple permissions to a role
     * @param role
     * @param permissions
     * @throws Error if role does not exist
     * @throws Error if one of the permissions already exists
     */
    public addPermissions(role: string, permissions: string[]): void {
        if(!this._rolesPermission[role])
            throw new Error(`Role ${role} does not exist`);
        for (const permission of permissions) {
            if(this._rolesPermission[role].includes(permission))
                throw new Error(`Permission ${permission} already exists`);
            this._rolesPermission[role].push(permission);
        }
    }

    /**
     * Remove a role
     * @param role
     * @throws Error if role does not exist
     */
    public removeRole(role: string): void {
        if(!this._rolesPermission[role])
            throw new Error(`Role ${role} does not exist`);
        delete this._rolesPermission[role];
    }

    /**
     * Remove multiple roles
     * @param roles
     * @throws Error if one of the roles does not exist
     */
    public removeRoles(roles: string[]): void {
        for (const role of roles) {
            if (!this._rolesPermission[role])
                throw new Error(`Role ${role} does not exist`);
            this.removeRole(role);
        }
    }

    /**
     * Remove a permission from a role
     * @param role
     * @param permission
     * @throws Error if role does not exist
     * @throws Error if permission does not exist
     */
    public removePermission(role: string, permission: string): void {
        if(!this._rolesPermission[role])
            throw new Error(`Role ${role} does not exist`);
        if(!this._rolesPermission[role].includes(permission))
            throw new Error(`Permission ${permission} does not exist`);
        this._rolesPermission[role] = this._rolesPermission[role].filter((item: string): boolean => item !== permission);
    }

    /**
     * Remove multiple permissions from a role
     * @param role
     * @param permissions
     * @throws Error if role does not exist
     * @throws Error if one of the permissions does not exist
     */
    public removePermissions(role: string, permissions: string[]): void {
        if(!this._rolesPermission[role])
            throw new Error(`Role ${role} does not exist`);
        for (const permission of permissions) {
            if(!this._rolesPermission[role].includes(permission))
                throw new Error(`Permission ${permission} does not exist`);
            this.removePermission(role, permission);
        }
    }

    /**
     * Get all roles
     */
    public getRoles(): string[] {
        return Object.keys(this._rolesPermission);
    }

    /**
     * Get all permissions of a role
     * @param role
     * @throws Error if role does not exist
     */
    public getPermissions(role: string): string[] {
        if (!this._rolesPermission[role])
            throw new Error(`Role ${role} does not exist`);
        return this._rolesPermission[role];
    }

    /**
     * Get all permissions of multiple roles
     */
    public get rolesPermission(): IRolePermissions {
        return this._rolesPermission;
    }


    /**
     * Set all roles with permissions
     * @param value
     */
    public set rolesPermission(value: IRolePermissions) {
        this._rolesPermission = value;
    }

    /**
     * Group roles with permissions
     * @param rawRoleAndPermission
     * @throws Error if one of the roles already exists
     */
    public groupRoleWithPermissions(rawRoleAndPermission: IRawRolePermission[]): void {
        const uniqueRoles: string[] = Array.from(new Set(rawRoleAndPermission.map((item: IRawRolePermission) => item.role)));
        uniqueRoles.forEach((role: string): void => {
            if(this._rolesPermission[role])
                throw new Error(`Role ${role} already exists`);
            this._rolesPermission[role] = rawRoleAndPermission
                .filter((item: IRawRolePermission): boolean => item.role === role)
                .map((item: IRawRolePermission) => item.permission);
        });
    }

    /**
     * Check if a role has a permission
     * @param permissionsToSearch
     * @throws Error if permission does not exist
     */
    public checkContainOneOfPermissions(permissionsToSearch: string[]): void {
        for (const permission of permissionsToSearch) {
            for (const role of Object.keys(this._rolesPermission)) {
                if(this._rolesPermission[role].includes(permission))
                    return;
            }
        }
        throw new Error(`Permission denied`);
    }

    /**
     * Check if a role has multiple permissions
     * @param permissionsToSearch
     * @throws Error if one of the permissions does not exist
     */
    public checkContainAllOfPermissions(permissionsToSearch: string[]): void {
        for (const permission of permissionsToSearch) {
            let hasPermission: boolean = false;
            for (const role of Object.keys(this._rolesPermission)) {
                if(this._rolesPermission[role].includes(permission)) {
                    hasPermission = true;
                    break;
                }
            }
            if (!hasPermission)
                throw new Error(`Permission denied`);
        }
    }

    /**
     * Constructor
     * @param rolesPermission
     */
    constructor(rolesPermission: IRolePermissions = {}) {
        this._rolesPermission = rolesPermission;
    }
}

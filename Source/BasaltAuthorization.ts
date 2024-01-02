import { IBasaltRolesPermissions, IBasaltRawRolePermission, IBasaltAuthorization } from '@/Interface';

export class BasaltAuthorization implements IBasaltAuthorization {
    /**
     * A dictionary to store roles and their associated permissions.
     * @private
     */
    private _rolesPermission: IBasaltRolesPermissions = {};

    /**
     * Adds a new role with optional permissions.
     * @param {string} role - The name of the role.
     * @param {Iterable<string>} permissions - An iterable of permission names to add.
     * @throws {Error} If the role already exists.
     */
    public addRole(role: string, permissions: Iterable<string> = []): void {
        if(this._rolesPermission[role])
            throw new Error(`Role ${role} already exists`);
        this._rolesPermission[role] = new Set(permissions);
    }

    /**
     * Adds multiple roles at once.
     * @param {string[]} roles - An array of role names to add.
     * @throws {Error} If any of the roles already exists.
     */
    public addRoles(roles: string[]): void {
        for (const role of roles) {
            if (this._rolesPermission[role])
                throw new Error(`Role ${role} already exists`);
            this.addRole(role);
        }
    }

    /**
     * Adds a permission to a role.
     * @param {string} role - The name of the role.
     * @param {string} permission - The name of the permission to add.
     * @throws {Error} If the role does not exist or if the permission already exists within the role.
     */
    public addPermission(role: string, permission: string): void {
        if(!this._rolesPermission[role])
            throw new Error(`Role ${role} does not exist`);
        if(this._rolesPermission[role].has(permission))
            throw new Error(`Permission ${permission} already exists in role ${role}`);
        this._rolesPermission[role].add(permission);
    }

    /**
     * Adds multiple permissions to a role.
     * @param {string} role - The name of the role.
     * @param {Iterable<string>} permissions - An iterable of permission names to add.
     * @throws {Error} If the role does not exist or if any of the permissions already exist within the role.
     */
    public addPermissions(role: string, permissions: Iterable<string>): void {
        if (!this._rolesPermission[role])
            throw new Error(`Role ${role} does not exist`);
        for (const permission of permissions) {
            if (this._rolesPermission[role].has(permission))
                throw new Error(`Permission ${permission} already exists in role ${role}`);
            this._rolesPermission[role].add(permission);
        }
    }

    /**
     * Removes a role.
     * @param {string} role - The name of the role to remove.
     * @throws {Error} If the role does not exist.
     */
    public removeRole(role: string): void {
        if(!this._rolesPermission[role])
            throw new Error(`Role ${role} does not exist`);
        delete this._rolesPermission[role];
    }

    /**
     * Removes multiple roles at once.
     * @param {string[]} roles - An array of role names to remove.
     * @throws {Error} If any of the roles do not exist.
     */
    public removeRoles(roles: string[]): void {
        for (const role of roles) {
            if (!this._rolesPermission[role])
                throw new Error(`Role ${role} does not exist`);
            this.removeRole(role);
        }
    }

    /**
     * Removes a permission from a role.
     * @param {string} role - The name of the role.
     * @param {string} permission - The name of the permission to remove.
     * @throws {Error} If the role or permission does not exist.
     */
    public removePermission(role: string, permission: string): void {
        if(!this._rolesPermission[role] || !this._rolesPermission[role].has(permission))
            throw new Error(`Permission "${permission}" does not exist in role "${role}"`);
        this._rolesPermission[role].delete(permission);
    }

    /**
     * Removes multiple permissions from a role.
     * @param {string} role - The name of the role.
     * @param {Iterable<string>} permissions - An iterable of permission names to remove.
     * @throws {Error} If the role does not exist or if any of the permissions do not exist within the role.
     */
    public removePermissions(role: string, permissions: Iterable<string>): void {
        if (!this._rolesPermission[role])
            throw new Error(`Role ${role} does not exist`);
        for (const permission of permissions) {
            if (!this._rolesPermission[role].has(permission))
                throw new Error(`Permission ${permission} does not exist in role ${role}`);
            this._rolesPermission[role].delete(permission);
        }
    }

    /**
     * Retrieves all roles.
     * @returns {string[]} An array of role names.
     */
    public getRoles(): string[] {
        return Object.keys(this._rolesPermission);
    }


    /**
     * Retrieves permissions for a role.
     * @param {string} role - The name of the role.
     * @returns {Set<string>} A set of permission names.
     * @throws {Error} If the role does not exist.
     */
    public getPermissions(role: string): Set<string> {
        if (!this._rolesPermission[role])
            throw new Error(`Role ${role} does not exist`);
        return this._rolesPermission[role];
    }


    /**
     * Gets the roles and permissions mapping.
     * @returns {IBasaltRolesPermissions} The current roles and permissions.
     */
    public get rolesPermission(): IBasaltRolesPermissions {
        return this._rolesPermission;
    }

    /**
     * Sets the roles and permissions mapping.
     * @param {IBasaltRolesPermissions} value - The new roles and permissions mapping.
     */
    public set rolesPermission(value: IBasaltRolesPermissions) {
        this._rolesPermission = value;
    }

    /**
     * Groups roles with their respective permissions from a list of raw role-permission objects.
     * @param {IBasaltRawRolePermission[]} rawRoleAndPermission - An array of objects containing role and permission properties.
     * @throws {Error} If any role already exists in the current mapping.
     */
    public groupRoleWithPermissions(rawRoleAndPermission: IBasaltRawRolePermission[]): void {
        const uniqueRoles: Set<string> = new Set(rawRoleAndPermission.map((item: IBasaltRawRolePermission) => item.role));
        uniqueRoles.forEach((role: string): void => {
            if (this._rolesPermission[role])
                throw new Error(`Role ${role} already exists`);
            this._rolesPermission[role] = new Set(rawRoleAndPermission
                .filter((item: IBasaltRawRolePermission): boolean => item.role === role)
                .map((item: IBasaltRawRolePermission) => item.permission));
        });
    }

    /**
     * Checks if any of the provided permissions exist in any role.
     * @param {string[]} permissionsToSearch - An array of permission names to check.
     * @throws {Error} If none of the permissions are found.
     */
    public checkContainOneOfPermissions(permissionsToSearch: string[]): void {
        const found: boolean = permissionsToSearch.some((permission: string) => {
            return Object.values(this._rolesPermission).some((permissions: Set<string>) => permissions.has(permission));
        });
        if (!found)
            throw new Error('Permission denied');
    }

    /**
     * Checks if all of the provided permissions exist in any role.
     * @param {string[]} permissionsToSearch - An array of permission names to check.
     * @throws {Error} If any of the permissions are not found.
     */
    public checkContainAllOfPermissions(permissionsToSearch: string[]): void {
        const notFound: boolean = permissionsToSearch.some((permission: string) => {
            return !Object.values(this._rolesPermission).some((permissions: Set<string>) => permissions.has(permission));
        });
        if (notFound)
            throw new Error('Permission denied');
    }

    /**
     * Constructs a new instance of BasaltRolesPermission with an optional initial role-permission mapping.
     * @param {IBasaltRolesPermissions} rolesPermission - An initial role-permission mapping to use.
     */
    constructor(rolesPermission: IBasaltRolesPermissions = {}) {
        this._rolesPermission = rolesPermission;
    }
}

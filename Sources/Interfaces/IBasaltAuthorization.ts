import { IBasaltRolesPermissions } from '@/Interfaces/IBasaltRolesPermissions';
import { IBasaltRawRolePermission } from '@/Interfaces/IBasaltRawRolePermission';

export interface IBasaltAuthorization {
    /**
     * Adds a new role with optional permissions.
     * @param {string} role - The name of the role.
     * @param {Iterable<string>} permissions - An iterable of permission names to add.
     * @throws {Error} If the role already exists.
     */
    addRole(role: string, permissions: Iterable<string>): void;

    /**
     * Adds multiple roles at once.
     * @param {string[]} roles - An array of role names to add.
     * @throws {Error} If any of the roles already exists.
     */
    addRoles(roles: string[]): void;

    /**
     * Adds a permission to a role.
     * @param {string} role - The name of the role.
     * @param {string} permission - The name of the permission to add.
     * @throws {Error} If the role does not exist or if the permission already exists within the role.
     */
    addPermission(role: string, permission: string): void;

    /**
     * Adds multiple permissions to a role.
     * @param {string} role - The name of the role.
     * @param {Iterable<string>} permissions - An iterable of permission names to add.
     * @throws {Error} If the role does not exist or if any of the permissions already exist within the role.
     */
    addPermissions(role: string, permissions: Iterable<string>): void;

    /**
     * Removes a role.
     * @param {string} role - The name of the role to remove.
     * @throws {Error} If the role does not exist.
     */
    removeRole(role: string): void;

    /**
     * Removes multiple roles at once.
     * @param {string[]} roles - An array of role names to remove.
     * @throws {Error} If any of the roles do not exist.
     */
    removeRoles(roles: string[]): void;

    /**
     * Removes a permission from a role.
     * @param {string} role - The name of the role.
     * @param {string} permission - The name of the permission to remove.
     * @throws {Error} If the role or permission does not exist.
     */
    removePermission(role: string, permission: string): void;

    /**
     * Removes multiple permissions from a role.
     * @param {string} role - The name of the role.
     * @param {Iterable<string>} permissions - An iterable of permission names to remove.
     * @throws {Error} If the role does not exist or if any of the permissions do not exist within the role.
     */
    removePermissions(role: string, permissions: Iterable<string>): void;

    /**
     * Retrieves all roles.
     * @returns {string[]} An array of role names.
     */
    getRoles(): string[];

    /**
     * Retrieves permissions for a role.
     * @param {string} role - The name of the role.
     * @returns {Set<string>} A set of permission names.
     * @throws {Error} If the role does not exist.
     */
    getPermissions(role: string): Set<string>;

    /**
     * Gets the roles and permissions mapping.
     * @returns {IBasaltRolesPermissions} The current roles and permissions.
     */
    get rolesPermission(): IBasaltRolesPermissions;

    /**
     * Sets the roles and permissions mapping.
     * @param {IBasaltRolesPermissions} value - The new roles and permissions mapping.
     */
    set rolesPermission(value: IBasaltRolesPermissions);

    /**
     * Groups roles with their respective permissions from a list of raw role-permission objects.
     * @param {IBasaltRawRolePermission[]} rawRoleAndPermission - An array of objects containing role and permission properties.
     * @throws {Error} If any role already exists in the current mapping.
     */
    groupRoleWithPermissions(rawRoleAndPermission: IBasaltRawRolePermission[]): void;

    /**
     * Checks if any of the provided permissions exist in any role.
     * @param {string[]} permissionsToSearch - An array of permission names to check.
     * @throws {Error} If none of the permissions are found.
     */
    checkContainOneOfPermissions(permissionsToSearch: string[]): void;

    /**
     * Checks if all of the provided permissions exist in any role.
     * @param {string[]} permissionsToSearch - An array of permission names to check.
     * @throws {Error} If any of the permissions are not found.
     */
    checkContainAllOfPermissions(permissionsToSearch: string[]): void;
}

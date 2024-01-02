import { Knex } from 'knex';

import { KnexDatabase } from '@/Infrastructure/Database/KnexDatabase';

import { IPermissionDTO, IRoleDTO, IRolePermissionDTO } from '@/Data/DTO/Models';
import { BasaltRole } from '@/Domain/BasaltRole';

export class BasaltAuthorization {
    private static _instance: BasaltAuthorization;
    private _basaltRole: BasaltRole | undefined;

    public static getInstance(): BasaltAuthorization {
        if (!BasaltAuthorization._instance) {
            BasaltAuthorization._instance = new BasaltAuthorization();
        }
        return BasaltAuthorization._instance;
    }

    public async connect(config: Knex.Config): Promise<this> {
        const knex: KnexDatabase = KnexDatabase.getInstance(config);
        knex.connect();
        this._basaltRole = new BasaltRole();
        return this;
    }

    public async disconnect(): Promise<void> {
        const knex: KnexDatabase = KnexDatabase.getInstance();
        knex.disconnect();
    }

    public async runMigration(): Promise<this> {
        const knex: KnexDatabase = KnexDatabase.getInstance();
        await knex.runMigrations();
        return this;
    }

    public async rollbackMigration(): Promise<this> {
        const knex: KnexDatabase = KnexDatabase.getInstance();
        await knex.rollbackAllMigration();
        return this;
    }












    public async linkRoleWithPermissions(role: string, permissions: string[]): Promise<void> {
        const [roleGet]: Pick<IRoleDTO, 'role' | 'id'>[] = await this._roleModel?.get([{
            role,
        }], {
            role: true,
            id: true,
        }) as Pick<IRoleDTO, 'role' | 'id'>[];

        const permissionsGet: Pick<IPermissionDTO, 'permission' | 'id'>[] = await this._permissionModel
            ?.get(permissions.map((permission: string): Pick<IPermissionDTO, 'permission'> => ({
                permission,
            })), {
                permission: true,
                id: true,
            }) as Pick<IPermissionDTO, 'permission' | 'id'>[];

        this._rolePermissionModel
            ?.create(permissionsGet.map((permission: Pick<IPermissionDTO, 'permission' | 'id'>)
                : Partial<IRolePermissionDTO> => ({
                roleId: roleGet.id,
                permissionId: permission.id,
            })));

    }







    // public groupRoleWithPermissions(rawRoleAndPermission: IBasaltPairRolePermission[]): void {



        // const uniqueRoles: Set<string> = new Set(rawRoleAndPermission.map((item: IBasaltPairRolePermission) => item.role));
        // uniqueRoles.forEach((role: string): void => {
        //     if (this._rolesPermission[role])
        //         throw new Error(`Role ${role} already exists`);
        //     this._rolesPermission[role] = new Set(rawRoleAndPermission
        //         .filter((item: IBasaltPairRolePermission): boolean => item.role === role)
        //         .map((item: IBasaltPairRolePermission) => item.permission));
        // });
    // }
    //
    // /**
    //  * Checks if any of the provided permissions exist in any role.
    //  * @param {string[]} permissionsToSearch - An array of permission names to check.
    //  * @throws {Error} If none of the permissions are found.
    //  */
    // public checkContainOneOfPermissions(permissionsToSearch: string[]): void {
    //     const found: boolean = permissionsToSearch.some((permission: string) => {
    //         return Object.values(this._rolesPermission).some((permissions: Set<string>) => permissions.has(permission));
    //     });
    //     if (!found)
    //         throw new Error('Permission denied');
    // }
    //
    // /**
    //  * Checks if all of the provided permissions exist in any role.
    //  * @param {string[]} permissionsToSearch - An array of permission names to check.
    //  * @throws {Error} If any of the permissions are not found.
    //  */
    // public checkContainAllOfPermissions(permissionsToSearch: string[]): void {
    //     const notFound: boolean = permissionsToSearch.some((permission: string) => {
    //         return !Object.values(this._rolesPermission).some((permissions: Set<string>) => permissions.has(permission));
    //     });
    //     if (notFound)
    //         throw new Error('Permission denied');
    // }
}

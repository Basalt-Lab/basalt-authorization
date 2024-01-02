import { IPermissionDTO } from '@/Data/DTO/Models';
import { RolePermissionModel } from '@/Infrastructure/Repository/Model';
import { KnexDatabase } from '@/Infrastructure/Database/KnexDatabase';

export class BasaltRolePermission {
    private readonly _knex: KnexDatabase;
    private readonly _rolePermissionModel: RolePermissionModel;

    constructor() {
        this._knex = KnexDatabase.getInstance();
        this._rolePermissionModel = new RolePermissionModel();
    }

    public async createPermission(permission: string): Promise<void> {
        if (await this.isPermissionExist(permission))
            throw new Error(`Permission ${permission} already exists`);
        await this._rolePermissionModel?.create([{
            permission,
        }]);
    }

    public async createPermissions(permissions: string[]): Promise<void> {
        await Promise.all(permissions.map(async (permission: string): Promise<void> => {
            await this.createPermission(permission);
        }));
    }

    public async readPermissions(): Promise<string[]> {
        try {
            const permissions: Pick<IPermissionDTO, 'permission'>[] = await this._rolePermissionModel?.getAll({
                permission: true,
            }) || [];
            return permissions.map((permission: Pick<IPermissionDTO, 'permission'>): string => permission.permission);
        } catch (error) {
            return [];
        }
    }

    public async deletePermission(permission: string): Promise<void> {
        if (!(await this.isPermissionExist(permission)))
            throw new Error(`Permission ${permission} does not exist`);
        await this._rolePermissionModel?.delete({
            permission,
        });
    }

    public async deletePermissions(permissions: string[]): Promise<void> {
        await Promise.all(permissions.map(async (permission: string): Promise<void> => {
            await this.deletePermission(permission);
        }));
    }
}

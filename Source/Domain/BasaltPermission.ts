import { IPermissionDTO } from '@/Data/DTO/Models';
import { PermissionModel } from '@/Infrastructure/Repository/Model';
import { KnexDatabase } from '@/Infrastructure/Database/KnexDatabase';

export class BasaltPermission {
    private readonly _knex: KnexDatabase;
    private readonly _permissionModel: PermissionModel;

    constructor() {
        this._knex = KnexDatabase.getInstance();
        this._permissionModel = new PermissionModel();
    }

    public async isPermissionExist(permission: string): Promise<boolean> {
        const result = await this._permissionModel?.count({
            permission,
        });
        if (typeof result === 'number')
            return result > 0;
        return false;
    }

    public async createPermission(permission: string): Promise<void> {
        if (await this.isPermissionExist(permission))
            throw new Error(`Permission ${permission} already exists`);
        await this._permissionModel?.create([{
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
            const permissions: Pick<IPermissionDTO, 'permission'>[] = await this._permissionModel?.getAll({
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
        await this._permissionModel?.delete({
            permission,
        });
    }

    public async deletePermissions(permissions: string[]): Promise<void> {
        await Promise.all(permissions.map(async (permission: string): Promise<void> => {
            await this.deletePermission(permission);
        }));
    }
}

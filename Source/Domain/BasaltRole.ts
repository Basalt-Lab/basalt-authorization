import { IRoleDTO } from '@/Data/DTO/Models';
import { RoleModel } from '@/Infrastructure/Repository/Model';
import { KnexDatabase } from '@/Infrastructure/Database/KnexDatabase';

export class BasaltRole {
    private readonly _knex: KnexDatabase;
    private readonly _roleModel: RoleModel;

    constructor() {
        this._knex = KnexDatabase.getInstance();
        this._roleModel = new RoleModel();
    }

    public async isRoleExist(role: string): Promise<boolean> {
        const result = await this._roleModel?.count({
            role,
        });
        if (typeof result === 'number')
            return result > 0;
        return false;
    }

    public async createRole(role: string): Promise<void> {
        if (await this.isRoleExist(role))
            throw new Error(`Role ${role} already exists`);
        await this._roleModel?.create([{
            role,
        }]);
    }

    public async createRoles(roles: string[]): Promise<void> {
        await Promise.all(roles.map(async (role: string): Promise<void> => {
            await this.createRole(role);
        }));
    }

    public async readRoles(): Promise<string[]> {
        try {
            const roles: Pick<IRoleDTO, 'role'>[] = await this._roleModel?.getAll({
                role: true,
            }) || [];
            return roles.map((role: Pick<IRoleDTO, 'role'>): string => role.role);
        } catch (error) {
            return [];
        }
    }

    public async deleteRole(role: string): Promise<void> {
        await this._roleModel?.delete({
            role,
        });
    }

    public async deleteRoles(roles: string[]): Promise<void> {
        await Promise.all(roles.map(async (role: string): Promise<void> => {
            await this.deleteRole(role);
        }));
    }
}

import { AbstractModel } from './AbstractModel';
import { IRolePermissionDTO } from '@/Data/DTO/Models';

export class RolePermissionModel extends AbstractModel<IRolePermissionDTO>{
    constructor() {
        super('role_permission');
    }
}

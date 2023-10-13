import { RolesPermission } from '@/RolesPermission';

describe('RolesPermission', (): void => {
    describe('addRole', (): void => {
        it('should add a role', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role');
            expect(rolesPermission.getRoles()).toEqual(['role']);
        });

        it('should throw an error if the role already exists', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role');
            expect((): void => rolesPermission.addRole('role')).toThrowError('Role role already exists');
        });
    });

    describe('addRoles', (): void => {
        it('should add roles', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRoles(['role1', 'role2']);
            expect(rolesPermission.getRoles()).toEqual(['role1', 'role2']);
        });

        it('should throw an error if the role already exists', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role');
            expect((): void => rolesPermission.addRoles(['role', 'role2'])).toThrowError('Role role already exists');
        });
    });

    describe('addPermission', (): void => {
        it('should add a permission', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role');
            rolesPermission.addPermission('role', 'permission');
            expect(rolesPermission.getPermissions('role')).toEqual(['permission']);
        });

        it('should throw an error if the role does not exist', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            expect((): void => rolesPermission.addPermission('role', 'permission')).toThrowError('Role role does not exist');
        });

        it('should throw an error if the permission already exists', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role');
            rolesPermission.addPermission('role', 'permission');
            expect((): void => rolesPermission.addPermission('role', 'permission')).toThrowError('Permission permission already exists');
        });
    });

    describe('addPermissions', (): void => {
        it('should add permissions', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role');
            rolesPermission.addPermissions('role', ['permission1', 'permission2']);
            expect(rolesPermission.getPermissions('role')).toEqual(['permission1', 'permission2']);
        });

        it('should throw an error if the role does not exist', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            expect((): void => rolesPermission.addPermissions('role', ['permission1', 'permission2'])).toThrowError('Role role does not exist');
        });

        it('should throw an error if the permission already exists', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role');
            rolesPermission.addPermission('role', 'permission');
            expect((): void => rolesPermission.addPermissions('role', ['permission', 'permission2'])).toThrowError('Permission permission already exists');
        });
    });

    describe('removeRole', (): void => {
        it('should remove a role', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role');
            rolesPermission.removeRole('role');
            expect(rolesPermission.getRoles()).toEqual([]);
        });

        it('should throw an error if the role does not exist', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            expect((): void => rolesPermission.removeRole('role')).toThrowError('Role role does not exist');
        });
    });

    describe('removeRoles', (): void => {
        it('should remove roles', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRoles(['role1', 'role2']);
            rolesPermission.removeRoles(['role1', 'role2']);
            expect(rolesPermission.getRoles()).toEqual([]);
        });

        it('should throw an error if the role does not exist', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            expect((): void => rolesPermission.removeRoles(['role1', 'role2'])).toThrowError('Role role1 does not exist');
        });
    });

    describe('removePermission', (): void => {
        it('should remove a permission', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role');
            rolesPermission.addPermission('role', 'permission');
            rolesPermission.removePermission('role', 'permission');
            expect(rolesPermission.getPermissions('role')).toEqual([]);
        });

        it('should throw an error if the role does not exist', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            expect((): void => rolesPermission.removePermission('role', 'permission')).toThrowError('Role role does not exist');
        });

        it('should throw an error if the permission does not exist', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role');
            expect((): void => rolesPermission.removePermission('role', 'permission')).toThrowError('Permission permission does not exist');
        });
    });

    describe('removePermissions', (): void => {
        it('should remove permissions', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role');
            rolesPermission.addPermissions('role', ['permission1', 'permission2']);
            rolesPermission.removePermissions('role', ['permission1', 'permission2']);
            expect(rolesPermission.getPermissions('role')).toEqual([]);
        });

        it('should throw an error if the role does not exist', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            expect((): void => rolesPermission.removePermissions('role', ['permission1', 'permission2'])).toThrowError('Role role does not exist');
        });

        it('should throw an error if the permission does not exist', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role');
            expect((): void => rolesPermission.removePermissions('role', ['permission1', 'permission2'])).toThrowError('Permission permission1 does not exist');
        });
    });

    describe('getRoles', (): void => {
        it('should return roles', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRoles(['role1', 'role2']);
            expect(rolesPermission.getRoles()).toEqual(['role1', 'role2']);
        });
    });

    describe('getPermissions', (): void => {
        it('should return permissions', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role');
            rolesPermission.addPermissions('role', ['permission1', 'permission2']);
            expect(rolesPermission.getPermissions('role')).toEqual(['permission1', 'permission2']);
        });

        it('should throw an error if the role does not exist', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            expect((): void => { rolesPermission.getPermissions('role') }).toThrowError('Role role does not exist');
        });
    });

    describe('getRolesAndPermissions', (): void => {
        it('should return roles and permissions', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRoles(['role1', 'role2']);
            rolesPermission.addPermissions('role1', ['permission1', 'permission2']);
            rolesPermission.addPermissions('role2', ['permission3', 'permission4']);
            expect(rolesPermission.rolesPermission).toEqual({
                role1: ['permission1', 'permission2'],
                role2: ['permission3', 'permission4']
            });
        });
    });

    describe('setRolesAndPermissions', (): void => {
        it('should set roles and permissions', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.rolesPermission = {
                role1: ['permission1', 'permission2'],
                role2: ['permission3', 'permission4']
            };
            expect(rolesPermission.rolesPermission).toEqual({
                role1: ['permission1', 'permission2'],
                role2: ['permission3', 'permission4']
            });
        });
    });

    describe('groupRoleWithPermissions', (): void => {
        it('should group roles with permissions', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.groupRoleWithPermissions([
                { role: 'role1', permission: 'permission1' },
                { role: 'role1', permission: 'permission2' },
                { role: 'role2', permission: 'permission3' },
                { role: 'role2', permission: 'permission4' }
            ]);
            expect(rolesPermission.rolesPermission).toEqual({
                role1: ['permission1', 'permission2'],
                role2: ['permission3', 'permission4']
            });
        });

        it('should throw an error if the role already exists', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role1');
            expect((): void => rolesPermission.groupRoleWithPermissions([
                { role: 'role1', permission: 'permission1' },
                { role: 'role1', permission: 'permission2' },
                { role: 'role2', permission: 'permission3' },
                { role: 'role2', permission: 'permission4' }
            ])).toThrowError('Role role1 already exists');
        });
    });

    describe('checkContainOneOfPermissions', (): void => {
        it('should throw an error if the role does not have permission', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role');
            rolesPermission.addPermission('role', 'permission');
            expect((): void => rolesPermission.checkContainOneOfPermissions(['permission1', 'permission2'])).toThrowError('Permission denied');
        });

        it('should not throw an error if the role has permission', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role');
            rolesPermission.addPermission('role', 'permission');
            expect((): void => rolesPermission.checkContainOneOfPermissions(['permission', 'permission2'])).not.toThrowError('Permission denied');
        });
    });

    describe('checkContainAllOfPermissions', (): void => {
        it('should throw an error if the role does not have permission', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role');
            rolesPermission.addPermission('role', 'permission');
            expect((): void => rolesPermission.checkContainAllOfPermissions(['permission1', 'permission2'])).toThrowError('Permission denied');
        });

        it('should throw an error if the role does not have all permissions', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role');
            rolesPermission.addPermission('role', 'permission');
            expect((): void => rolesPermission.checkContainAllOfPermissions(['permission', 'permission2'])).toThrowError('Permission denied');
        });

        it('should not throw an error if the role has all permissions', (): void => {
            const rolesPermission: RolesPermission = new RolesPermission();
            rolesPermission.addRole('role');
            rolesPermission.addPermissions('role', ['permission', 'permission2']);
            expect((): void => rolesPermission.checkContainAllOfPermissions(['permission', 'permission2'])).not.toThrowError('Permission denied');
        });
    });

});

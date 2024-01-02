import { Knex } from 'knex';

import {
    CreateRoleTable,
    CreatePermissionTable,
    CreateRolePermissionTable,
    CreateCredentialRoleTable
} from '@/Infrastructure/Database/Migration';

export class MigrationSource implements Knex.MigrationSource<unknown> {
    public getMigrations(): Promise<string[]> {
        return Promise.resolve([
            'CreateRoleTable',
            'CreatePermissionTable',
            'CreateRolePermissionTable',
            'CreateCredentialRoleTable'
        ]);
    }

    public getMigrationName(migration: string): string {
        return migration;
    }

    public getMigration(migration: string): Promise<Knex.Migration> {
        return new Promise((resolve): void => {
            switch (migration) {
            case 'CreateRoleTable':
                resolve({
                    up: CreateRoleTable.up,
                    down: CreateRoleTable.down
                });
                break;
            case 'CreatePermissionTable':
                resolve({
                    up: CreatePermissionTable.up,
                    down: CreatePermissionTable.down
                });
                break;
            case 'CreateRolePermissionTable':
                resolve({
                    up: CreateRolePermissionTable.up,
                    down: CreateRolePermissionTable.down
                });
                break;
            case 'CreateCredentialRoleTable':
                resolve({
                    up: CreateCredentialRoleTable.up,
                    down: CreateCredentialRoleTable.down
                });
                break;
            }
        });
    }
}



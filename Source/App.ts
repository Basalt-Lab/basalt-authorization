export { BasaltAuthorization } from '@/Domain/BasaltAuthorization';
export { IBasaltRolesPermissions, IBasaltPairRolePermission, IBasaltAuthorization } from '@/Domain/Interface';

import { BasaltAuthorization } from '@/Domain/BasaltAuthorization';

const main = async (): Promise<void> => {
    try {
        const basaltAuthorization: BasaltAuthorization = new BasaltAuthorization();
        await basaltAuthorization.connect({
            client: 'better-sqlite3',
            connection: {
                filename: './auhtorization.db'
            },
            useNullAsDefault: true
        });
        await basaltAuthorization.addRoles(['admin', 'user']);
        await basaltAuthorization.addPermissions([
            'create',
            'read',
            'update',
            'delete',
        ]);

        await basaltAuthorization.linkRoleWithPermissions('admin', [
            'create',
            'read',
            'update',
            'delete',
        ]);


    } catch (e) {
        console.error(e);
    }
};

main().catch((error: Error): void => {
    console.error(error);
});





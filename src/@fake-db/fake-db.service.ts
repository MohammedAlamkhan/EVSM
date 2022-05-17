import { InMemoryDbService } from 'angular-in-memory-web-api';

import { UsersFakeData } from '@fake-db/users.data';

export class FakeDbService implements InMemoryDbService {
    createDb(): any {
        return {
            'users-data': UsersFakeData.users,

        };
    }
}

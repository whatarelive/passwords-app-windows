import type { UUID } from "node:crypto";
import type { ActivitySchema } from "./activity";
import type { WebAccountSchema } from "./web-account";

export class User {
    constructor(
        public readonly id: UUID,
        public name: string,
        public password: { hash: string, salt: string },
        public activities?: ActivitySchema[],
        public webAccounts?: WebAccountSchema[],
    ) {}
}

export type UserSchema = InstanceType<typeof User>;
import type { UUID } from "node:crypto";
import type { ActivitySchema } from "./activity";

export class User {
    constructor(
        public readonly id: UUID,
        public name: string,
        public password: string,
        public activities: ActivitySchema[],
        public webAccounts: [],
    ) {}
}

export type UserScema = typeof User;
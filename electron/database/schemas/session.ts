import type { UUID } from "crypto";

export class Session {
    constructor(
        public userId: UUID,
        public userName: string,
        public createTime: number,
    ) {}
}

export type SessionSchema = InstanceType<typeof Session>;
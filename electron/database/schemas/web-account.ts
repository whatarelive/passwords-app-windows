import type { UUID } from "crypto";

export class WebAccount {
    constructor(
        public readonly id: UUID,
        public readonly userId: UUID,
        public readonly webName: string,
        public readonly webUser: string,
        public readonly webPassword: { iv: string, password: string },
        public readonly webUrl: string 
    ) {}
}

export type WebAccountSchema = InstanceType<typeof WebAccount>;
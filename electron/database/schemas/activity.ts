import type { UUID } from "crypto";

export class Activity {
    constructor(
        public readonly id: UUID,
        public readonly userId: UUID,
        public readonly action: string,
        public readonly date: Date,
        public readonly details: string,
    ) {}
}

export type ActivitySchema = typeof Activity;
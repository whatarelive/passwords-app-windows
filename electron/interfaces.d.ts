import type { UUID } from "crypto";

export interface IAddUser {
    name: string;
    password: string;
}

export interface IAddWebAccount {
    userId: UUID;
    webName: string;
    webUser: string;
    webPassword: string;
    webUrl: string;
}
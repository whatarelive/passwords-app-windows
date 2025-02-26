import type { UUID } from "crypto";

export interface IAddUser {
    name: string;
    password: string;
}

export interface IDeleteUser {
    id: UUID;
}

export interface IAddWebAccount {
    userId: UUID;
    webName: string;
    webUser: string;
    webPassword: string;
    webUrl: string;
}

export interface IEditWebAccount {
    id: UUID;
    webName: string;
    webUser: string;
    webPassword: string;
    webUrl: string;
}

export interface IAddActivity {
    userId: UUID;
    action: string;
    details: string;
}
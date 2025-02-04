export interface WebAccount {
    id: string,
    webName: string,
    webUser: string,
    webPassword: string,
    webUrl: string 
}

export interface Activity {
    id: string;
    action: string;
    date: Date | string;
    details: string;
}

export type InputWebAccount = "webPassword" | "webUser" | "webUrl" | "webName";
export interface WebAccount {
    id: string,
    webName: string,
    webUser: string,
    webPassword: string,
    webUrl: string 
}

export type InputWebAccount = "webPassword" | "webUser" | "webUrl" | "webName";
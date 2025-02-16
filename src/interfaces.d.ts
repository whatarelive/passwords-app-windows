export interface WebAccount {
    id: string;
    userId: string;
    webName: string;
    webUser: string;
    webPassword: string;
    webUrl: string;
}

export interface Activity {
    id: string;
    action: string;
    date: Date | string;
    details: string;
}

export type InputWebAccount = "webPassword" | "webUser" | "webUrl" | "webName";

export interface FormError {
    user?: string[];
    password?: string[];
    confirmPassword?: string[];
}

export type RegisterState = {
    errors?: string[];
    message?: string | null;
}

export type AuthenticateState = {
    errors?: Omit<FormError, "confirmPassword">;
    message?: string | null;
}
import { create } from "zustand";
import type { WebAccount } from "@/interfaces";

interface State {
    message?: string;
    view: "ERROR" | "SUCESS" | "WARNING" | null;
    userId: string | null, 
    accounts: WebAccount[];

    getAccounts: (userIdSession?: string) => Promise<void>;
    getAccountWithId: (id?: string) => WebAccount | undefined;
    addAccount: (webName: string, webPassword:string, webUrl: string, webUser: string) => Promise<void>;
    editAccount: (id: string, webName: string, webPassword: string, webUrl: string, webUser: string) => Promise<void>;
    deleteAccount: (id: string) => Promise<void>;
    searchAccounts: (param: string) => void;
    disableView: () => void;
    dispatchError: (message: string) => void;
}

export const useAccountsStore = create<State>()((set, get) => ({
    view: null,
    accounts: [],
    userId: null,

    async getAccounts(userIdSesion) {
        const userIdStore = get().userId;
        
        const { data } = await window.ipcRenderer.invoke('webAccount-getAll', { userId: userIdStore || userIdSesion });

        if (userIdStore) {
            set({ accounts: data });              
        
        } else {
            set({
                userId: userIdSesion,
                accounts: data,
            });  
        }
    },

    getAccountWithId(id) {
        return get().accounts.find((account) => account.id === id);
    },

    async addAccount(webName, webPassword, webUrl, webUser) {
        const userId = get().userId;

        const { ok, message } = await window.ipcRenderer.invoke('webAccount-add', { userId, webName, webPassword, webUrl, webUser });

        set({
            view: ok ? "SUCESS" : "ERROR",
            message 
        })
    },

    async editAccount(id, webName, webPassword, webUrl, webUser) {
        const { ok, message } = await window.ipcRenderer.invoke('webAccount-edit', { id, webName, webPassword, webUrl, webUser });

        set({
            view: ok ? "SUCESS" : "ERROR",
            message 
        })
    },

    async deleteAccount(id) {
        const { ok, message } = await window.ipcRenderer.invoke('webAccount-delete', { id });

        set({
            view: ok ? "SUCESS" : "ERROR",
            message,
        })
    },

    searchAccounts(param) {
        const accounts = get().accounts;
        const paramLowerCase = param.toLowerCase();
        let webNameIncluded: boolean, webUrlIncluded: boolean, webUserIncluded: boolean;

        const accountsWithParam = accounts.filter((account) => {
            webNameIncluded = account.webName.toLowerCase().includes(paramLowerCase);
            webUrlIncluded = account.webUrl.toLowerCase().includes(paramLowerCase);
            webUserIncluded = account.webUser.toLowerCase().includes(paramLowerCase);

            if (webNameIncluded || webUrlIncluded || webUserIncluded) return account;
        });

        set({ accounts: accountsWithParam });
    },

    disableView() {
        set({ view: null })
    },

    dispatchError(message) {
        set({ view: "WARNING", message });
    }
}))
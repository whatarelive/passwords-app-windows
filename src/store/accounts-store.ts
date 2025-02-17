import { create } from "zustand";
import type { WebAccount } from "@/interfaces";

interface State {
    message?: string;
    view: "ERROR" | "SUCESS" | null;
    userId: string | null, 
    accounts: WebAccount[] | null;

    getAccounts: (userId: string) => Promise<void>;
    addAccount: (webName: string, webPassword:string, webUrl: string, webUser: string) => Promise<void>;
    editAccount: (id: string, webName: string, webPassword: string, webUrl: string, webUser: string) => Promise<void>;
    deleteAccount: (id: string) => Promise<void>;
    disableView: () => void;
}

export const useAccountsStore = create<State>()((set, get) => ({
    view: null,
    accounts: [],
    userId: null,

    async getAccounts(userId) {
        const { data } = await window.ipcRenderer.invoke('webAccount-getAll', { userId });

        set({
            userId,
            accounts: data,
        })  
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
            message 
        })
    },

    disableView() {
        set({ view: null })
    },
}))
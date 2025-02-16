import { create } from "zustand";
import { useAuthStore } from "./auth-store";
import type { WebAccount } from "@/interfaces";

interface State {
    message?: string;
    view: "ERROR" | "SUCESS" | null;
    userId: string, 
    accounts: WebAccount[] | null;

    getAccounts: () => Promise<void>;
    addAccount: (webName: string, webPassword:string, webUrl: string, webUser: string) => Promise<void>;
    editAccount: (id: string, webName: string, webPassword: string, webUrl: string, webUser: string) => Promise<void>;
    deleteAccount: (id: string) => Promise<void>;
    disableView: () => void;
}

export const useAccountsStore = create<State>()((set, get) => ({
    view: null,
    accounts: null,
    userId: useAuthStore((state) => state.session?.userId!),

    async getAccounts() {
        const userId = get().userId;

        const { ok, message, data } = await window.ipcRenderer.invoke('getAll-webAccount', { userId });

        set({
            view: ok ? null : "ERROR",
            message,
            accounts: data,
        })  
    },

    async addAccount(webName, webPassword, webUrl, webUser) {
        const userId = get().userId;

        const { ok, message } = await window.ipcRenderer.invoke('add-webAccount', { userId, webName, webPassword, webUrl, webUser });

        set({
            view: ok ? "SUCESS" : "ERROR",
            message 
        })
    },

    async editAccount(id, webName, webPassword, webUrl, webUser) {
        const { ok, message } = await window.ipcRenderer.invoke('edit-webAccount', { id, webName, webPassword, webUrl, webUser });

        set({
            view: ok ? "SUCESS" : "ERROR",
            message 
        })
    },

    async deleteAccount(id) {
        const { ok, message } = await window.ipcRenderer.invoke('delete-webAccount', { id });

        set({
            view: ok ? "SUCESS" : "ERROR",
            message 
        })
    },

    disableView() {
        set({ view: null })
    },
}))
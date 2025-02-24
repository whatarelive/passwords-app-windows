import { create } from "zustand";

interface State {
    message?: string;
    view: "ERROR" | "SUCESS" | null; 
    userId: string | null;
    
    register: (name: string, password: string) => Promise<void>;
    login: (name: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkSession: () => Promise<void>;
    disableView: () => void;
}

export const useAuthStore = create<State>()((set, get) => ({
    userId: null,
    view: null,

    async register(name, password) {
        const { ok, message, userId } = await window.ipcRenderer.invoke('user-add', { name, password });
        
        set({ 
            view: ok ? "SUCESS" : "ERROR",
            userId,
            message 
        });
    },

    async login(name, password) {
        const { ok, message, userId } = await window.ipcRenderer.invoke('user-verify', { name, password });

        set({ 
            view: ok ? "SUCESS" : "ERROR",
            userId,
            message 
        });
    },

    async logout() {
        await window.ipcRenderer.invoke('user-session-clear');

        set({ userId: null });
    },

    async checkSession() {
        const userIdInStore = get().userId;

        const { userId } = await window.ipcRenderer.invoke('user-session');
        
        if (!userId) {
            return set({ userId: null });
        } 

        if (!userIdInStore) {
            set({ userId });
        }
    },

    disableView() {
        set({ view: null });
    },
}))
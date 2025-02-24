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

export const useAuthStore = create<State>()((set) => ({
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
        await window.ipcRenderer.invoke('session-clear');

        set({ userId: null });
    },

    async checkSession() {
        const session = await window.ipcRenderer.invoke('session-check');
        
        if (!session) {
            return set({ userId: null });
        } 

        set({ userId: session.userId }); 
    },

    disableView() {
        set({ view: null });
    },
}))
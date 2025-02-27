import { create } from "zustand";

interface State {
    message: string | null;
    view: "ERROR" | "SUCESS" | null; 
    userId: string | null;
    userName: string | null;
    
    register: (name: string, password: string) => Promise<void>;
    login: (name: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkSession: () => Promise<void>;
    disableView: () => void;
}

export const useAuthStore = create<State>()((set) => ({
    userId: null,
    userName: null,
    view: null,
    message: null,

    async register(name, password) {
        const { ok, message, userId, userName } = await window.ipcRenderer.invoke('user-add', { name, password });
        
        set({ 
            view: ok ? "SUCESS" : "ERROR",
            userId,
            userName,
            message 
        });
    },

    async login(name, password) {
        const { ok, message, userId, userName } = await window.ipcRenderer.invoke('user-verify', { name, password });

        set({ 
            view: ok ? "SUCESS" : "ERROR",
            userId,
            userName,
            message 
        });
    },

    async logout() {
        await window.ipcRenderer.invoke('session-clear');

        set({ userId: null, userName: null, view: null, message: "" });
    },

    async checkSession() {
        const session = await window.ipcRenderer.invoke('session-check');
        
        if (!session) {
            return set({ userId: null, userName: null });
        } 

        set({ userId: session.userId, userName: session.userName }); 
    },

    disableView() {
        set({ view: null });
    },
}))
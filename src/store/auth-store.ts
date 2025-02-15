import { create } from "zustand";

interface State {
    message?: string;
    view: "ERROR" | "SUCESS" | null; 
    session: {
        userId: string;
        expiresTime: number; 
    } | null;
    
    register: (name: string, password: string) => Promise<void>;
    
    login: (name: string, password: string) => Promise<void>;
    
    disableView: () => void;
}

export const useAuthStore = create<State>()((set) => ({
    result: null,
    session: null,
    view: null,

    async register(name, password) {
        const { ok, message } = await window.ipcRenderer.invoke('user-add', { name, password });

        set({ 
            view: ok ? "SUCESS" : "ERROR",
            message 
        });
    },

    async login(name, password) {
        const { ok, message } = await window.ipcRenderer.invoke('user-verify', { name, password });

        set({ 
            view: ok ? "SUCESS" : "ERROR",
            message 
        });
    },

    disableView() {
        set({ view: null })
    },
}))
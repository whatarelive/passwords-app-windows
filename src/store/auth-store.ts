import { create } from "zustand";

interface State {
    message?: string;
    view: "ERROR" | "SUCESS" | null; 
    session: {
        userId: string;
        createTime: number; 
    } | null;
    
    register: (name: string, password: string) => Promise<void>;
    login: (name: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkSession: () => void;
    disableView: () => void;
}

export const useAuthStore = create<State>()((set, get) => ({
    session: null,
    view: null,

    async register(name, password) {
        const { ok, message, userId } = await window.ipcRenderer.invoke('user-add', { name, password });

        set({ 
            view: ok ? "SUCESS" : "ERROR",
            session: { userId, createTime: Date.now()},
            message 
        });
    },

    async login(name, password) {
        const { ok, message, userId } = await window.ipcRenderer.invoke('user-verify', { name, password });
        
        set({ 
            view: ok ? "SUCESS" : "ERROR",
            session: { userId, createTime: Date.now()},
            message 
        });
    },

    async logout() {
        set({ session: null });
    },

    checkSession() {
        const createTime = get().session?.createTime;
        
        if (!createTime) return;
        
        const timeNow = Date.now();
        const result = timeNow - createTime;

        if (result <= 3600000) return;

        set({ session: null });
    },

    disableView() {
        set({ view: null })
    },
}))
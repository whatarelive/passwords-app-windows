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
        
        const createTime = Date.now();

        localStorage.setItem('session', JSON.stringify({ userId, createTime }));
        
        set({ 
            view: ok ? "SUCESS" : "ERROR",
            session: { userId, createTime },
            message 
        });
    },

    async login(name, password) {
        const { ok, message, userId } = await window.ipcRenderer.invoke('user-verify', { name, password });
        
        const createTime = Date.now();

        localStorage.setItem('session', JSON.stringify({ userId, createTime }));

        set({ 
            view: ok ? "SUCESS" : "ERROR",
            session: { userId, createTime },
            message 
        });
    },

    async logout() {
        localStorage.clear();

        set({ session: null });
    },

    checkSession() {
        const session = localStorage.getItem('session');

        if (!session) return;
        
        const { userId, createTime } = JSON.parse(session);
        
        if (!userId) return;
        
        if (get().session === null) {
            set({ 
                session: { userId, createTime } 
            });
        }

        const timeNow = Date.now();
        const result = timeNow - createTime;

        if (result <= 3600000) return;

        set({ session: null });
    },

    disableView() {
        set({ view: null })
    },
}))
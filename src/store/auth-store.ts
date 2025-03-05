import { Activity } from "@/interfaces";
import { create } from "zustand";

interface State {
    message: string | null;
    view: "ERROR" | "SUCESS" | null; 
    userId: string | null;
    userName: string | null;
    userActivities: Activity[] | null;
    
    register: (name: string, password: string) => Promise<void>;
    login: (name: string, password: string) => Promise<void>;
    changePassword: (password: string) => Promise<void>;
    getUserActivities: () => Promise<void>;
    logout: () => Promise<void>;
    checkSession: () => Promise<void>;
    disableView: () => void;
}

export const useAuthStore = create<State>()((set, get) => ({
    userId: null,
    userName: null,
    userActivities: null,
    view: null,
    message: null,

    async register(name, password) {
        const { ok, message, userId, userName } = await window.ipcRenderer.invoke('user-add', { name, password });
        const { ok: status, data } = await window.ipcRenderer.invoke('activities-getAll', { userId });

        if (status) {
            set({ 
                view: ok ? "SUCESS" : "ERROR",
                userId,
                userName,
                userActivities: data,
                message 
            });
            
        } else {   
            set({ view: "ERROR", message: "Error al iniciar la sesión" });
        }
    },

    async login(name, password) {
        const { ok, message, userId, userName } = await window.ipcRenderer.invoke('user-verify', { name, password });
        
        if (ok) {
            const { ok: status, data } = await window.ipcRenderer.invoke('activities-getAll', { userId });
            
            set({ 
                view: status ? "SUCESS" : "ERROR",
                userId,
                userName,
                userActivities: data,
                message 
            });
            
        } else {   
            set({ 
                view: "ERROR", 
                message: "Error al iniciar la sesión" 
            });
        }
    },

    async changePassword(password) {
        const { userId } = get();

        const { ok, message } = await window.ipcRenderer.invoke('user-edit', { id: userId, password });

        set({ 
            view: ok ? "SUCESS" : "ERROR", 
            message 
        });
    },

    async getUserActivities() {
        const { userId, logout } = get();
        const { ok, data } = await window.ipcRenderer.invoke('activities-getAll', { userId });
        
        if (ok) set({ userActivities: data });
        else logout();
    },

    async logout() {
        await window.ipcRenderer.invoke('session-clear');

        set({ userId: null, userName: null, userActivities: null, view: null, message: "" });
    },

    async checkSession() {
        const session = await window.ipcRenderer.invoke('session-check');
        const { ok, data } = await window.ipcRenderer.invoke('activities-getAll', { userId: session.userId });
        
        if (!session || !ok) {
            return set({ 
                userId: null, 
                userName: null, 
                userActivities: null 
            });
        } 

        set({ 
            userId: session.userId, 
            userName: session.userName, 
            userActivities: data 
        }); 
    },

    disableView() {
        set({ view: null, message: null });
    },
}))
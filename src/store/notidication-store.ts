import { create } from "zustand";

interface State {
    isView: boolean;
    notification: string;
    setView: (message: string) => void;
}

export const useNotificationStore = create<State>()((set) => ({
    isView: false,
    notification: "",

    setView(message) {
        set({ isView: true, notification: message });

        setTimeout(() => {
            set({ isView: false, notification: "" });
        }, 2000);
    },
}))
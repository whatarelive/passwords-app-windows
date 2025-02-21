import { create } from "zustand";

interface State {
    isOpen: boolean;
    rangePassword: number;
    specialCaracters: boolean;
    setOpen: () => void;
    setConfigValue: (params: {specialCaracters?: boolean, rangePassword?: number}) => void;
    createRandomPassword: () => string;
}

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const caracters = "!@#$%^&*()_+{}[]|:;<>,.?";

export const useRandomPassword = create<State>()((set, get) => ({
    isOpen: false,
    rangePassword: 8,
    specialCaracters: false,
    
    setOpen: () => {
        set((state) => ({ isOpen: !state.isOpen }));
    },

    setConfigValue({ specialCaracters, rangePassword }) {
        if (specialCaracters !== undefined) {
            set({ specialCaracters: !specialCaracters });
        }
        
        if (rangePassword) {
            set({ rangePassword });
        }
    },

    createRandomPassword() {
        const { specialCaracters, rangePassword } = get();

        let chars = charset;
        let password = "";

        if (specialCaracters) chars += caracters;        

        for (let i = 0; i < rangePassword; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return password;
    },
}));
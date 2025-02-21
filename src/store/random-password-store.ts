import { create } from "zustand";

interface State {
    rangePassword: number;
    specialCaracters: boolean;
    setConfigValue: (specialCaracters?: boolean, rangePassword?: number) => void;
    createRandomPassword: () => string;
}

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const caracters = "!@#$%^&*()_+{}[]|:;<>,.?";

export const useRandomPassword = create<State>()((set, get) => ({
    rangePassword: 8,
    specialCaracters: false,
    
    setConfigValue(specialCaracters, rangePassword) {
        set((state) => ({ 
            specialCaracters: specialCaracters || state.specialCaracters, 
            rangePassword: rangePassword || state.rangePassword,
        }));
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
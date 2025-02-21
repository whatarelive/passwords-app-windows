import { create } from "zustand";

interface State {
    isOpen: boolean;
    setOpen: () => void;
}

export const useMenuStore = create<State>()((set) => ({
    isOpen: false,
    setOpen: () => {
        set((state) => ({ isOpen: !state.isOpen }));
    } 
}))
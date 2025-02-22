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

interface CardMenuState {
    idKey: string | null;
    setOpen: (id: string | null) => void;
}

export const useCardMenuStore = create<CardMenuState>()((set) => ({
    idKey: null,
    setOpen: (id) => {
        set({ idKey: id });
    },
}))
import {create} from "zustand";

type Format = {currency: string; decimals: number; separator:string};
type Store = {
    format: Format;
    setFormat: (format: Format) => void;
};

export const useStore = create<Store>((set) => ({
    format: {currency: "RD$", decimals: 2, separator: ","},
    setFormat: (format) => set({format}),
}));
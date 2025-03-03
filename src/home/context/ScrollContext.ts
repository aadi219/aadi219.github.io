import { createContext, useContext } from "react";

interface ScrollContextType {
    scrollToIndex: (index: number) => void;
}

export const ScrollContext = createContext<ScrollContextType | undefined>(
    undefined
);

export const useScroll = () => {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error("useScroll must be used within a ScrollProvider");
    }
    return context;
};

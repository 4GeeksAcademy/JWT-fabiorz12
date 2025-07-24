import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore, createActions } from "../store";

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [storeBase, dispatch] = useReducer(storeReducer, initialStore());
    const actions = createActions(dispatch);
    
    const store = { ...storeBase, actions }; // sobreescribimos store.actions

    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    const context = useContext(StoreContext);
    if (!context) throw new Error("useGlobalReducer must be used within a StoreProvider");
    return context;
}
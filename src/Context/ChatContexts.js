import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";

export const ChatContexts = createContext()


export const ChatContextsProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext)
    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    }
    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId:
                        currentUser.uid > action.payload.uid
                            ? currentUser.uid + action.payload.uid
                            : action.payload.uid + currentUser.uid,
                };
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
    return (
        <ChatContexts.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContexts.Provider>
    )
};
import { createContext } from "react";
import { User } from "../types/user";

interface ContextValue {
    user?: User,
    setUser: (user: User) => void,
}

export const UserContext = createContext<ContextValue>({
    setUser: (user: User) => {}
});

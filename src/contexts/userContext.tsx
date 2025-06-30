import { createContext, useState, useContext, type ReactNode } from "react";
import type { User } from "../interfaces/UserInterface";

interface UserContextProps {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children } : {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (newUser: User) => {
        setUser(newUser);
    };

    const logout = () => {
        setUser({} as User);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

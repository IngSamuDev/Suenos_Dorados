import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const USER_KEY = "@auth_user";
const USERS_KEY = "@registered_users";
const AuthContext = createContext<AuthContextType | null>(null);

interface StoredUser extends User {
    password: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Restaurar sesión al iniciar
    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem(USER_KEY);
                if (stored) setUser(JSON.parse(stored));
            } catch { }
            setIsLoading(false);
        })();
    }, []);

    const login = useCallback(async (email: string, password: string): Promise<boolean> => {
        try {
            const stored = await AsyncStorage.getItem(USERS_KEY);
            const users: StoredUser[] = stored ? JSON.parse(stored) : [];
            const found = users.find(
                (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
            );
            if (!found) return false;
            const { password: _, ...safeUser } = found;
            setUser(safeUser);
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(safeUser));
            return true;
        } catch {
            return false;
        }
    }, []);

    const register = useCallback(
        async (name: string, email: string, password: string): Promise<boolean> => {
            try {
                const stored = await AsyncStorage.getItem(USERS_KEY);
                const users: StoredUser[] = stored ? JSON.parse(stored) : [];
                const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
                if (exists) return false;
                const newUser: StoredUser = {
                    id: Date.now().toString(),
                    name,
                    email,
                    password,
                };
                users.push(newUser);
                await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
                const { password: _, ...safeUser } = newUser;
                setUser(safeUser);
                await AsyncStorage.setItem(USER_KEY, JSON.stringify(safeUser));
                return true;
            } catch {
                return false;
            }
        },
        []
    );

    const logout = useCallback(async () => {
        await AsyncStorage.removeItem(USER_KEY);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, isLoading, login, register, logout, isAuthenticated: !!user }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
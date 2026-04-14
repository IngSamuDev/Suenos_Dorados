import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartItem } from "./CartContext";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    status: "pendiente" | "en_camino" | "entregado" | "cancelado";
}

export interface Address {
    id: string;
    label: string; // Casa, Oficina, etc.
    fullAddress: string;
    city: string;
    phone: string;
    isDefault: boolean;
}

export interface PaymentMethod {
    id: string;
    type: "tarjeta" | "pse" | "efectivo";
    label: string;     // Visa ****1234
    details: string;   // nombre, banco, etc.
    isDefault: boolean;
}

interface OrdersContextType {
    orders: Order[];
    addresses: Address[];
    payments: PaymentMethod[];
    placeOrder: (items: CartItem[], total: number) => Promise<Order>;
    addAddress: (addr: Omit<Address, "id">) => Promise<void>;
    updateAddress: (addr: Address) => Promise<void>;
    deleteAddress: (id: string) => Promise<void>;
    addPayment: (p: Omit<PaymentMethod, "id">) => Promise<void>;
    updatePayment: (p: PaymentMethod) => Promise<void>;
    deletePayment: (id: string) => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ORDERS_KEY = "@orders";
const ADDRESSES_KEY = "@addresses";
const PAYMENTS_KEY = "@payments";

const OrdersContext = createContext<OrdersContextType | null>(null);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [payments, setPayments] = useState<PaymentMethod[]>([]);

    // Cargar al montar
    useEffect(() => {
        (async () => {
            try {
                const [o, a, p] = await Promise.all([
                    AsyncStorage.getItem(ORDERS_KEY),
                    AsyncStorage.getItem(ADDRESSES_KEY),
                    AsyncStorage.getItem(PAYMENTS_KEY),
                ]);
                if (o) setOrders(JSON.parse(o));
                if (a) setAddresses(JSON.parse(a));
                if (p) setPayments(JSON.parse(p));
            } catch { }
        })();
    }, []);

    // Persistir órdenes
    useEffect(() => {
        AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(orders)).catch(() => { });
    }, [orders]);

    // Persistir direcciones
    useEffect(() => {
        AsyncStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses)).catch(() => { });
    }, [addresses]);

    // Persistir pagos
    useEffect(() => {
        AsyncStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments)).catch(() => { });
    }, [payments]);

    // ─── Orders ───────────────────────────────────────────────────────────────

    const placeOrder = useCallback(async (items: CartItem[], total: number): Promise<Order> => {
        const newOrder: Order = {
            id: `ORD-${Date.now()}`,
            date: new Date().toISOString(),
            items,
            total,
            status: "pendiente",
        };
        setOrders((prev) => [newOrder, ...prev]);
        return newOrder;
    }, []);

    // ─── Addresses ────────────────────────────────────────────────────────────

    const addAddress = useCallback(async (addr: Omit<Address, "id">) => {
        const newAddr: Address = { ...addr, id: Date.now().toString() };
        setAddresses((prev) => {
            if (addr.isDefault) {
                return [newAddr, ...prev.map((a) => ({ ...a, isDefault: false }))];
            }
            return [...prev, newAddr];
        });
    }, []);

    const updateAddress = useCallback(async (addr: Address) => {
        setAddresses((prev) =>
            prev.map((a) => {
                if (addr.isDefault && a.id !== addr.id) return { ...a, isDefault: false };
                return a.id === addr.id ? addr : a;
            })
        );
    }, []);

    const deleteAddress = useCallback(async (id: string) => {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
    }, []);

    // ─── Payments ─────────────────────────────────────────────────────────────

    const addPayment = useCallback(async (p: Omit<PaymentMethod, "id">) => {
        const newP: PaymentMethod = { ...p, id: Date.now().toString() };
        setPayments((prev) => {
            if (p.isDefault) {
                return [newP, ...prev.map((x) => ({ ...x, isDefault: false }))];
            }
            return [...prev, newP];
        });
    }, []);

    const updatePayment = useCallback(async (p: PaymentMethod) => {
        setPayments((prev) =>
            prev.map((x) => {
                if (p.isDefault && x.id !== p.id) return { ...x, isDefault: false };
                return x.id === p.id ? p : x;
            })
        );
    }, []);

    const deletePayment = useCallback(async (id: string) => {
        setPayments((prev) => prev.filter((p) => p.id !== id));
    }, []);

    return (
        <OrdersContext.Provider
            value={{
                orders,
                addresses,
                payments,
                placeOrder,
                addAddress,
                updateAddress,
                deleteAddress,
                addPayment,
                updatePayment,
                deletePayment,
            }}
        >
            {children}
        </OrdersContext.Provider>
    );
}

export function useOrders() {
    const ctx = useContext(OrdersContext);
    if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
    return ctx;
}
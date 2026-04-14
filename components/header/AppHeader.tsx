import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
<<<<<<< HEAD
import {
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import AppDrawer from "../drawer/AppDrawer";
=======
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppDrawer from "../drawer/AppDrawer";
import { useCart } from "../../context/CartContext";
>>>>>>> cami-zapata

const BG = "#fffdf9";
const CARD = "#ffffff";
const BORDER = "#ede8e0";
const TEXT = "#2d2520";
const MUTED = "#c0b4a4";
const ORANGE = "#f5a742";
const AMBER = "#fff3dc";

interface AppHeaderProps {
    showSearch?: boolean;
    title?: string;
}

export default function AppHeader({ showSearch = true, title }: AppHeaderProps) {
    const router = useRouter();
    const [drawerOpen, setDrawerOpen] = useState(false);
<<<<<<< HEAD
    const [search, setSearch] = useState("");
=======
    const { count } = useCart();
>>>>>>> cami-zapata

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={BG} />
            <AppDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

            <View style={s.header}>
                <View style={s.row}>

<<<<<<< HEAD
                    {/* Menú hamburger */}
=======
                    {/* Hamburger */}
>>>>>>> cami-zapata
                    <TouchableOpacity
                        style={s.menuBtn}
                        onPress={() => setDrawerOpen(true)}
                        activeOpacity={0.7}
                    >
                        <Feather name="menu" size={20} color={TEXT} />
                    </TouchableOpacity>

                    {/* Marca o título */}
                    <View style={s.center}>
                        {title ? (
                            <Text style={s.pageTitle}>{title}</Text>
                        ) : (
                            <>
                                <Text style={s.storeName}>Sueños Dorados</Text>
                                <Text style={s.storeSub}>Salta · Colombia</Text>
                            </>
                        )}
                    </View>

                    {/* Iconos derecha */}
                    <View style={s.rightIcons}>
<<<<<<< HEAD
                        {/* 👤 Usuario / Login */}
                        <TouchableOpacity
                            style={s.iconBtn}
                            onPress={() => router.push("/(tabs)/login" as any)}
=======
                        {/* Carrito con badge */}
                        <TouchableOpacity
                            style={[s.iconBtn, s.cartBtn]}
                            onPress={() => router.push("/(tabs)/cart" as any)}
                            activeOpacity={0.7}
                        >
                            <Feather name="shopping-cart" size={18} color={ORANGE} />
                            {count > 0 && (
                                <View style={s.badge}>
                                    <Text style={s.badgeTxt}>{count > 9 ? "9+" : count}</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        {/* Usuario */}
                        <TouchableOpacity
                            style={s.iconBtn}
                            onPress={() => router.push("/(tabs)/profile" as any)}
>>>>>>> cami-zapata
                            activeOpacity={0.7}
                        >
                            <Feather name="user" size={18} color={MUTED} />
                        </TouchableOpacity>
<<<<<<< HEAD

                        {/* ❤️ Favoritos */}
                        <TouchableOpacity style={s.iconBtn} activeOpacity={0.7}>
                            <Feather name="heart" size={18} color={MUTED} />
                        </TouchableOpacity>

                        {/* 🛒 Carrito */}
                        <TouchableOpacity style={[s.iconBtn, s.cartBtn]} activeOpacity={0.7}>
                            <Feather name="shopping-cart" size={18} color={ORANGE} />
                            <View style={s.badge}>
                                <Text style={s.badgeTxt}>2</Text>
                            </View>
                        </TouchableOpacity>
=======
>>>>>>> cami-zapata
                    </View>
                </View>

                {/* Buscador */}
                {showSearch && (
<<<<<<< HEAD
                    <View style={s.searchWrap}>
                        <Feather name="search" size={15} color={MUTED} style={{ marginRight: 10 }} />
                        <TextInput
                            value={search}
                            onChangeText={setSearch}
                            placeholder="Buscar edredones, cobijas..."
                            placeholderTextColor={MUTED}
                            style={s.searchInput}
                        />
                        {search.length > 0 && (
                            <TouchableOpacity onPress={() => setSearch("")}>
                                <Feather name="x" size={16} color={MUTED} />
                            </TouchableOpacity>
                        )}
                    </View>
=======
                    <TouchableOpacity
                        style={s.searchWrap}
                        activeOpacity={0.7}
                        onPress={() => router.push("/(tabs)/explore" as any)}
                    >
                        <Feather name="search" size={15} color={MUTED} style={{ marginRight: 10 }} />
                        <Text style={s.searchPlaceholder}>Buscar edredones, cobijas...</Text>
                    </TouchableOpacity>
>>>>>>> cami-zapata
                )}
            </View>
        </>
    );
}

const s = StyleSheet.create({
    header: {
        backgroundColor: BG,
        paddingHorizontal: 20,
        paddingTop: 52,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
    },
    menuBtn: {
        width: 40, height: 40, borderRadius: 12,
<<<<<<< HEAD
        backgroundColor: CARD,
        borderWidth: 1, borderColor: BORDER,
        alignItems: "center", justifyContent: "center",
        marginRight: 12,
=======
        backgroundColor: CARD, borderWidth: 1, borderColor: BORDER,
        alignItems: "center", justifyContent: "center", marginRight: 12,
>>>>>>> cami-zapata
    },
    center: { flex: 1 },
    storeName: { fontSize: 18, fontWeight: "800", color: TEXT, letterSpacing: -0.4 },
    storeSub: { fontSize: 11, color: MUTED, marginTop: 1 },
    pageTitle: { fontSize: 18, fontWeight: "800", color: TEXT },
    rightIcons: { flexDirection: "row", gap: 8 },
    iconBtn: {
        width: 40, height: 40, borderRadius: 20,
<<<<<<< HEAD
        backgroundColor: CARD,
        borderWidth: 1, borderColor: BORDER,
=======
        backgroundColor: CARD, borderWidth: 1, borderColor: BORDER,
>>>>>>> cami-zapata
        alignItems: "center", justifyContent: "center",
    },
    cartBtn: { backgroundColor: AMBER, borderColor: "#f5d99a" },
    badge: {
        position: "absolute", top: -2, right: -2,
<<<<<<< HEAD
        width: 16, height: 16, borderRadius: 8,
        backgroundColor: ORANGE,
        alignItems: "center", justifyContent: "center",
        borderWidth: 1.5, borderColor: BG,
=======
        minWidth: 16, height: 16, borderRadius: 8,
        backgroundColor: ORANGE, alignItems: "center", justifyContent: "center",
        borderWidth: 1.5, borderColor: BG, paddingHorizontal: 2,
>>>>>>> cami-zapata
    },
    badgeTxt: { fontSize: 9, fontWeight: "800", color: "#fff" },
    searchWrap: {
        flexDirection: "row", alignItems: "center",
<<<<<<< HEAD
        backgroundColor: CARD,
        borderWidth: 1, borderColor: BORDER,
        borderRadius: 12,
        paddingHorizontal: 14, paddingVertical: 11,
    },
    searchInput: { flex: 1, fontSize: 14, color: TEXT },
=======
        backgroundColor: CARD, borderWidth: 1, borderColor: BORDER,
        borderRadius: 12, paddingHorizontal: 14, paddingVertical: 11,
    },
    searchPlaceholder: { flex: 1, fontSize: 14, color: MUTED },
>>>>>>> cami-zapata
});
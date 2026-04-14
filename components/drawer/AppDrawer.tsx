import { Feather } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React, { useRef } from "react";
import {
    Animated,
    Dimensions,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";

const { width: SCREEN_W } = Dimensions.get("window");
const DRAWER_W = SCREEN_W * 0.78;

const BG = "#fffdf9";
const ORANGE = "#f5a742";
const AMBER = "#fff3dc";
const TEXT = "#2d2520";
const MUTED = "#c0b4a4";
const BORDER = "#ede8e0";
const CREAM = "#fef8f0";

const NAV_ITEMS: {
    label: string;
    icon: React.ComponentProps<typeof Feather>["name"];
    route: string;
}[] = [
        { label: "Inicio", icon: "home", route: "/(tabs)/(stacks)/" },
        { label: "Carrito", icon: "shopping-cart", route: "/(tabs)/cart" },
        { label: "Favoritos", icon: "heart", route: "/(tabs)/favorites" },
        { label: "Mis pedidos", icon: "package", route: "/(tabs)/orders" },
        { label: "Mi perfil", icon: "user", route: "/(tabs)/profile" },
    ];

const EXTRA_ITEMS: {
    label: string;
    icon: React.ComponentProps<typeof Feather>["name"];
}[] = [
        { label: "Configuración", icon: "settings" },
    ];

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AppDrawer({ isOpen, onClose }: DrawerProps) {
    const router = useRouter();
    const pathname = usePathname();
    const translateX = useRef(new Animated.Value(-DRAWER_W)).current;

    React.useEffect(() => {
        Animated.spring(translateX, {
            toValue: isOpen ? 0 : -DRAWER_W,
            useNativeDriver: false, // ← false para compatibilidad web
            damping: 22,
            stiffness: 200,
        }).start();
    }, [isOpen]);

    const navigate = (route: string) => {
        onClose();
        setTimeout(() => router.push(route as any), 250);
    };

    return (
        <Modal
            visible={isOpen}
            transparent
            animationType="none"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            {/* Backdrop */}
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={s.backdrop} />
            </TouchableWithoutFeedback>

            {/* Panel */}
            <Animated.View style={[s.drawer, { transform: [{ translateX }] }]}>
                <SafeAreaView style={{ flex: 1 }}>

                    {/* Branding */}
                    <View style={s.drawerHeader}>
                        <View style={s.logoWrap}>
                            <View style={s.logoCircle}>
                                <Feather name="moon" size={22} color={ORANGE} />
                            </View>
                            <View>
                                <Text style={s.logoName}>Sueños Dorados</Text>
                                <Text style={s.logoSub}>Salta · Colombia</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={onClose} style={s.closeBtn}>
                            <Feather name="x" size={16} color={MUTED} />
                        </TouchableOpacity>
                    </View>

                    {/* Promo */}
                    <View style={s.promoChip}>
                        <Feather name="truck" size={13} color="#a06010" style={{ marginRight: 6 }} />
                        <Text style={s.promoTxt}>Envío gratis en compras +$100.000 COP</Text>
                    </View>

                    {/* Nav principal */}
                    <Text style={s.groupLabel}>MENÚ</Text>
                    <View style={s.navList}>
                        {NAV_ITEMS.map((item) => {
                            const active = pathname === item.route;
                            return (
                                <TouchableOpacity
                                    key={item.label}
                                    style={[s.navItem, active && s.navItemActive]}
                                    onPress={() => navigate(item.route)}
                                    activeOpacity={0.7}
                                >
                                    <View style={[s.navIconBox, active && s.navIconBoxActive]}>
                                        <Feather name={item.icon} size={17} color={active ? ORANGE : MUTED} />
                                    </View>
                                    <Text style={[s.navLabel, active && s.navLabelActive]}>
                                        {item.label}
                                    </Text>
                                    {active && <Feather name="chevron-right" size={14} color={ORANGE} />}
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Divider */}
                    <View style={s.divider} />
                    <Text style={s.groupLabel}>AYUDA</Text>

                    <View style={s.navList}>
                        {EXTRA_ITEMS.map((item) => (
                            <TouchableOpacity key={item.label} style={s.navItem} activeOpacity={0.7}>
                                <View style={s.navIconBox}>
                                    <Feather name={item.icon} size={17} color={MUTED} />
                                </View>
                                <Text style={s.navLabel}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Footer */}
                    <View style={s.footer}>
                        <Text style={s.footerTxt}>Sueños Dorados © 2025</Text>
                        <Text style={s.footerSub}>Hecho con amor en Colombia 🇨🇴</Text>
                    </View>

                </SafeAreaView>
            </Animated.View>
        </Modal>
    );
}

const s = StyleSheet.create({
    backdrop: {
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(45,37,32,0.45)",
    },
    drawer: {
        position: "absolute",
        top: 0, left: 0, bottom: 0,
        width: DRAWER_W,
        backgroundColor: BG,
        shadowColor: "#000",
        shadowOffset: { width: 8, height: 0 },
        shadowOpacity: 0.12,
        shadowRadius: 24,
        elevation: 24,
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
    },
    drawerHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 52,
        paddingBottom: 20,
    },
    logoWrap: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
    logoCircle: {
        width: 46, height: 46, borderRadius: 23,
        backgroundColor: AMBER,
        borderWidth: 1.5, borderColor: "#f5d99a",
        alignItems: "center", justifyContent: "center",
    },
    logoName: { fontSize: 16, fontWeight: "800", color: TEXT },
    logoSub: { fontSize: 11, color: MUTED, marginTop: 2 },
    closeBtn: {
        width: 32, height: 32, borderRadius: 16,
        backgroundColor: CREAM,
        borderWidth: 1, borderColor: BORDER,
        alignItems: "center", justifyContent: "center",
    },
    promoChip: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20, marginBottom: 22,
        backgroundColor: AMBER,
        borderRadius: 10,
        paddingHorizontal: 12, paddingVertical: 10,
        borderWidth: 1, borderColor: "#f5d99a",
    },
    promoTxt: { fontSize: 12, color: "#8a6010", fontWeight: "600", flex: 1 },
    groupLabel: {
        paddingHorizontal: 20, marginBottom: 4,
        fontSize: 10, fontWeight: "700", color: MUTED, letterSpacing: 1.5,
    },
    navList: { paddingHorizontal: 12, gap: 1 },
    navItem: {
        flexDirection: "row", alignItems: "center",
        paddingHorizontal: 10, paddingVertical: 13,
        borderRadius: 12, gap: 12,
    },
    navItemActive: { backgroundColor: AMBER },
    navIconBox: {
        width: 34, height: 34, borderRadius: 9,
        backgroundColor: CREAM,
        borderWidth: 1, borderColor: BORDER,
        alignItems: "center", justifyContent: "center",
    },
    navIconBoxActive: { backgroundColor: "#ffe8b8", borderColor: "#f5d99a" },
    navLabel: { fontSize: 14, fontWeight: "600", color: TEXT, flex: 1 },
    navLabelActive: { color: "#9a5c00", fontWeight: "700" },
    divider: {
        height: 1, backgroundColor: BORDER,
        marginHorizontal: 20, marginVertical: 14,
    },
    footer: {
        position: "absolute", bottom: 28,
        left: 0, right: 0,
        alignItems: "center", gap: 3,
    },
    footerTxt: { fontSize: 12, color: MUTED },
    footerSub: { fontSize: 11, color: ORANGE },
});
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppHeader from "../../components/header/AppHeader";
import { COLORS } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrdersContext";

// ─── Menú de ítems ────────────────────────────────────────────────────────────
const MENU_ITEMS: {
    icon: React.ComponentProps<typeof Feather>["name"];
    label: string;
    route?: string;
    danger?: boolean;
}[] = [
        { icon: "package", label: "Mis pedidos", route: "/(tabs)/orders" },
        { icon: "map-pin", label: "Mis direcciones", route: "/(tabs)/addresses" },
        { icon: "credit-card", label: "Métodos de pago", route: "/(tabs)/payments" },
        { icon: "bell", label: "Notificaciones", route: "/(tabs)/notifications" },
{ icon: "help-circle", label: "Ayuda y soporte", route: "/(tabs)/support" },
        { icon: "log-out", label: "Cerrar sesión", danger: true },
    ];

export default function Profile() {
    const router = useRouter();
    const { user, isAuthenticated, logout } = useAuth();
    const { orders } = useOrders();

    const handleMenu = async (item: typeof MENU_ITEMS[0]) => {
        if (item.danger) {
            await logout();
            router.replace("/(tabs)/login" as any);
            return;
        }
        if (item.route) {
            router.push(item.route as any);
        }
    };

    return (
        <View style={s.root}>
            <AppHeader showSearch={false} title="Mi perfil" />
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* ── Avatar / info usuario ──────────────────── */}
                <View style={s.avatarRow}>
                    <View style={s.avatar}>
                        <Text style={s.avatarInitial}>
                            {isAuthenticated && user?.name ? user.name[0].toUpperCase() : "?"}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={s.name}>{isAuthenticated ? user?.name : "Invitado"}</Text>
                        <Text style={s.email}>
                            {isAuthenticated ? user?.email : "Iniciá sesión para continuar"}
                        </Text>
                    </View>
                </View>

                {/* ── Stats rápidos (si está logueado) ──────── */}
                {isAuthenticated && (
                    <View style={s.statsRow}>
                        <View style={s.statItem}>
                            <Text style={s.statNum}>{orders.length}</Text>
                            <Text style={s.statLbl}>Pedidos</Text>
                        </View>
                        <View style={s.statDivider} />
                        <View style={s.statItem}>
                            <Text style={s.statNum}>
                                {orders.filter((o) => o.status === "entregado").length}
                            </Text>
                            <Text style={s.statLbl}>Entregados</Text>
                        </View>
                        <View style={s.statDivider} />
                        <View style={s.statItem}>
                            <Text style={s.statNum}>
                                {orders.filter((o) => o.status === "pendiente").length}
                            </Text>
                            <Text style={s.statLbl}>Pendientes</Text>
                        </View>
                    </View>
                )}

                {/* ── Banners login/registro (si no logueado) ── */}
                {!isAuthenticated && (
                    <>
                        <TouchableOpacity
                            style={s.banner}
                            onPress={() => router.push("/(tabs)/login" as any)}
                            activeOpacity={0.85}
                        >
                            <View style={s.bannerLeft}>
                                <View style={s.bannerIcon}>
                                    <Feather name="log-in" size={18} color={COLORS.orange} />
                                </View>
                                <View>
                                    <Text style={s.bannerTitle}>Iniciá sesión</Text>
                                    <Text style={s.bannerSub}>Accedé a todos los beneficios</Text>
                                </View>
                            </View>
                            <Feather name="chevron-right" size={16} color={COLORS.orange} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[s.banner, { marginBottom: 20 }]}
                            onPress={() => router.push("/(tabs)/register" as any)}
                            activeOpacity={0.85}
                        >
                            <View style={s.bannerLeft}>
                                <View style={s.bannerIcon}>
                                    <Feather name="user-plus" size={18} color={COLORS.orange} />
                                </View>
                                <View>
                                    <Text style={s.bannerTitle}>Crea tu cuenta</Text>
                                    <Text style={s.bannerSub}>Es gratis y rápido</Text>
                                </View>
                            </View>
                            <Feather name="chevron-right" size={16} color={COLORS.orange} />
                        </TouchableOpacity>
                    </>
                )}

                {/* ── Menú ──────────────────────────────────── */}
                <View style={s.menuCard}>
                    {MENU_ITEMS.map((item, i) => {
                        // Ocultar "Cerrar sesión" si no está logueado
                        if (item.danger && !isAuthenticated) return null;
                        return (
                            <TouchableOpacity
                                key={item.label}
                                style={[s.menuItem, i < MENU_ITEMS.length - 1 && s.menuBorder]}
                                onPress={() => handleMenu(item)}
                                activeOpacity={0.7}
                            >
                                <View style={[s.menuIcon, item.danger && s.menuIconDanger]}>
                                    <Feather
                                        name={item.icon}
                                        size={17}
                                        color={item.danger ? COLORS.red : COLORS.orange}
                                    />
                                </View>
                                <Text style={[s.menuLabel, item.danger && s.menuLabelDanger]}>
                                    {item.label}
                                </Text>
                                <Feather name="chevron-right" size={15} color={COLORS.mutedDark} />
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <Text style={s.version}>NightCo · v1.0.0</Text>
            </ScrollView>
        </View>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: COLORS.bg },

    // Avatar
    avatarRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        backgroundColor: COLORS.card,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 16,
        marginBottom: 12,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.amber,
        borderWidth: 2,
        borderColor: COLORS.amberBorder,
        alignItems: "center",
        justifyContent: "center",
    },
    avatarInitial: { fontSize: 24, fontWeight: "800", color: COLORS.orange },
    name: { fontSize: 17, fontWeight: "800", color: COLORS.text },
    email: { fontSize: 12, color: COLORS.muted, marginTop: 2 },

    // Stats
    statsRow: {
        flexDirection: "row",
        backgroundColor: COLORS.card,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingVertical: 16,
        marginBottom: 16,
    },
    statItem: { flex: 1, alignItems: "center" },
    statNum: { fontSize: 20, fontWeight: "900", color: COLORS.orange },
    statLbl: { fontSize: 11, color: COLORS.muted, marginTop: 2 },
    statDivider: { width: 1, backgroundColor: COLORS.border },

    // Banners
    banner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.amber,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.amberBorder,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 10,
    },
    bannerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
    bannerIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    bannerTitle: { fontSize: 14, fontWeight: "800", color: COLORS.text },
    bannerSub: { fontSize: 12, color: COLORS.mutedDark, marginTop: 2 },

    // Menú
    menuCard: {
        backgroundColor: COLORS.card,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: "hidden",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 13,
        paddingHorizontal: 16,
        paddingVertical: 15,
    },
    menuBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
    menuIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: COLORS.amber,
        alignItems: "center",
        justifyContent: "center",
    },
    menuIconDanger: { backgroundColor: "#fff0f0" },
    menuLabel: { flex: 1, fontSize: 14, fontWeight: "600", color: COLORS.text },
    menuLabelDanger: { color: COLORS.red },

    version: { fontSize: 11, color: COLORS.mutedDark, textAlign: "center", marginTop: 24 },
});
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, RADIUS } from "../../constants/theme";

// ─── Datos de ejemplo ─────────────────────────────────────────────────────────
const NOTIFICATIONS = [
    {
        id: "1", type: "order", icon: "package" as const,
        title: "Pedido en camino",
        message: "Tu pedido ORD-002 está en camino. Llegará pronto.",
        time: "Hace 2 horas", read: false,
    },
    {
        id: "2", type: "promo", icon: "tag" as const,
        title: "¡Oferta especial!",
        message: "30% de descuento en toda la colección de edredones este fin de semana.",
        time: "Hace 5 horas", read: false,
    },
    {
        id: "3", type: "delivered", icon: "check-circle" as const,
        title: "Pedido entregado",
        message: "Tu pedido ORD-001 fue entregado exitosamente.",
        time: "Hace 2 días", read: true,
    },
    {
        id: "4", type: "shipping", icon: "truck" as const,
        title: "Envío gratis disponible",
        message: "Agregá $15.000 más a tu carrito y obtené envío gratis.",
        time: "Hace 3 días", read: true,
    },
    {
        id: "5", type: "info", icon: "info" as const,
        title: "Actualización de la app",
        message: "Hay una nueva versión disponible con mejoras de rendimiento.",
        time: "Hace 5 días", read: true,
    },
];

const ICON_COLORS: Record<string, string> = {
    order: COLORS.orange,
    promo: "#9b72cf",
    delivered: COLORS.green,
    shipping: COLORS.blue,
    info: COLORS.mutedDark,
};

function NotificationCard({ item }: { item: typeof NOTIFICATIONS[0] }) {
    const iconColor = ICON_COLORS[item.type] ?? COLORS.orange;
    return (
        <TouchableOpacity style={[s.card, !item.read && s.cardUnread]} activeOpacity={0.7}>
            <View style={[s.iconWrap, { backgroundColor: item.read ? COLORS.amber : "#fff3dc" }]}>
                <Feather name={item.icon} size={18} color={iconColor} />
            </View>
            <View style={s.content}>
                <View style={s.titleRow}>
                    <Text style={s.cardTitle}>{item.title}</Text>
                    {!item.read && <View style={s.dot} />}
                </View>
                <Text style={s.message} numberOfLines={2}>{item.message}</Text>
                <Text style={s.time}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default function Notifications() {
    const router = useRouter();
    const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

    return (
        <View style={s.root}>
            {/* ── Header con retroceso ── */}
            <View style={s.header}>
                <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
                    <Feather name="arrow-left" size={20} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={s.title}>Notificaciones</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
                {unreadCount > 0 && (
                    <View style={s.banner}>
                        <Feather name="bell" size={14} color={COLORS.amberAccent} />
                        <Text style={s.bannerTxt}>
                            Tenés {unreadCount} notificación{unreadCount > 1 ? "es" : ""} sin leer
                        </Text>
                    </View>
                )}

                <View style={s.list}>
                    {NOTIFICATIONS.map((item, i) => (
                        <View key={item.id}>
                            <NotificationCard item={item} />
                            {i < NOTIFICATIONS.length - 1 && <View style={s.divider} />}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: COLORS.bg },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 52,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        backgroundColor: COLORS.bg,
    },
    backBtn: {
        width: 40, height: 40,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
    },
    title: { fontSize: 17, fontWeight: "800", color: COLORS.text },
    scroll: { padding: 16, paddingBottom: 100 },
    banner: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: COLORS.amber,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        borderColor: COLORS.amberBorder,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 16,
    },
    bannerTxt: { fontSize: 13, fontWeight: "600", color: COLORS.amberAccent },
    list: {
        backgroundColor: COLORS.card,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: "hidden",
    },
    card: { flexDirection: "row", alignItems: "flex-start", gap: 12, padding: 16 },
    cardUnread: { backgroundColor: "#fffbf4" },
    iconWrap: {
        width: 40, height: 40,
        borderRadius: RADIUS.md,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: COLORS.amberBorder,
    },
    content: { flex: 1, gap: 3 },
    titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    cardTitle: { fontSize: 14, fontWeight: "700", color: COLORS.text, flex: 1 },
    dot: { width: 8, height: 8, borderRadius: RADIUS.full, backgroundColor: COLORS.orange },
    message: { fontSize: 12, color: COLORS.muted, lineHeight: 17 },
    time: { fontSize: 11, color: COLORS.mutedDark, marginTop: 2 },
    divider: { height: 1, backgroundColor: COLORS.border, marginLeft: 68 },
});
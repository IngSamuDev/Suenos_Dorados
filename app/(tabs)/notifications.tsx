import { Feather } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppHeader from "../../components/header/AppHeader";
import { ICON_COLORS, NOTIFICATIONS } from "../../constants/notifications";
import { COLORS, RADIUS } from "../../constants/theme";

function NotificationCard({ item }: { item: typeof NOTIFICATIONS[0] }) {
    const iconColor = ICON_COLORS[item.type] ?? COLORS.orange;

    return (
        <TouchableOpacity style={[s.card, !item.read && s.cardUnread]} activeOpacity={0.7}>
            <View style={[s.iconWrap, { backgroundColor: item.read ? COLORS.amber : "#fff3dc" }]}>
                <Feather name={item.icon} size={18} color={iconColor} />
            </View>
            <View style={s.content}>
                <View style={s.titleRow}>
                    <Text style={s.title}>{item.title}</Text>
                    {!item.read && <View style={s.dot} />}
                </View>
                <Text style={s.message} numberOfLines={2}>{item.message}</Text>
                <Text style={s.time}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default function Notifications() {
    const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

    return (
        <View style={s.root}>
            <AppHeader showSearch={false} title="Notificaciones" />
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
    card: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
        padding: 16,
    },
    cardUnread: { backgroundColor: "#fffbf4" },
    iconWrap: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.md,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: COLORS.amberBorder,
    },
    content: { flex: 1, gap: 3 },
    titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    title: { fontSize: 14, fontWeight: "700", color: COLORS.text, flex: 1 },
    dot: {
        width: 8,
        height: 8,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.orange,
    },
    message: { fontSize: 12, color: COLORS.muted, lineHeight: 17 },
    time: { fontSize: 11, color: COLORS.mutedDark, marginTop: 2 },
    divider: { height: 1, backgroundColor: COLORS.border, marginLeft: 68 },
});
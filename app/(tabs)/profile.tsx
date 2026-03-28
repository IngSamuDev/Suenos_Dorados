import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppHeader from "../../components/header/AppHeader";

const MENU = [
    { icon: "package" as const, label: "Mis pedidos" },
    { icon: "map-pin" as const, label: "Mis direcciones" },
    { icon: "credit-card" as const, label: "Métodos de pago" },
    { icon: "bell" as const, label: "Notificaciones" },
    { icon: "help-circle" as const, label: "Ayuda y soporte" },
    { icon: "log-out" as const, label: "Cerrar sesión" },
];

export default function Profile() {
    const router = useRouter();

    return (
        <View style={s.root}>
            <AppHeader showSearch={false} title="Mi perfil" />
            <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>

                {/* Avatar */}
                <View style={s.avatarRow}>
                    <View style={s.avatar}>
                        <Feather name="user" size={32} color="#f5a742" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={s.name}>Invitado</Text>
                        <Text style={s.email}>Iniciá sesión para continuar</Text>
                    </View>
                    <TouchableOpacity
                        style={s.editBtn}
                        onPress={() => router.push("/(tabs)/register" as any)}
                    >
                        <Feather name="user-plus" size={14} color="#f5a742" />
                    </TouchableOpacity>
                </View>

                {/* Banner registro */}
                <TouchableOpacity
                    style={s.registerBanner}
                    onPress={() => router.push("/(tabs)/register" as any)}
                    activeOpacity={0.85}
                >
                    <View style={s.registerBannerLeft}>
                        <Feather name="moon" size={18} color="#f5a742" />
                        <View>
                            <Text style={s.registerBannerTitle}>Crea tu cuenta</Text>
                            <Text style={s.registerBannerSub}>Accede a todos los beneficios</Text>
                        </View>
                    </View>
                    <Feather name="chevron-right" size={16} color="#f5a742" />
                </TouchableOpacity>

                {/* Menú */}
                <View style={s.menuCard}>
                    {MENU.map((item, i) => (
                        <TouchableOpacity
                            key={item.label}
                            style={[s.menuItem, i < MENU.length - 1 && s.menuBorder]}
                        >
                            <View style={s.menuIcon}>
                                <Feather name={item.icon} size={17} color="#f5a742" />
                            </View>
                            <Text style={s.menuLabel}>{item.label}</Text>
                            <Feather name="chevron-right" size={15} color="#c0b4a4" />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: "#fffdf9" },
    avatarRow: {
        flexDirection: "row", alignItems: "center", gap: 14,
        backgroundColor: "#fff", borderRadius: 18,
        borderWidth: 1, borderColor: "#ede8e0",
        padding: 16, marginBottom: 12,
    },
    avatar: {
        width: 60, height: 60, borderRadius: 30,
        backgroundColor: "#fff3dc",
        borderWidth: 2, borderColor: "#f5d99a",
        alignItems: "center", justifyContent: "center",
    },
    name: { fontSize: 17, fontWeight: "800", color: "#2d2520" },
    email: { fontSize: 12, color: "#b0a090", marginTop: 2 },
    editBtn: {
        width: 34, height: 34, borderRadius: 10,
        backgroundColor: "#fff3dc",
        borderWidth: 1, borderColor: "#f5d99a",
        alignItems: "center", justifyContent: "center",
    },
    registerBanner: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        backgroundColor: "#fff3dc",
        borderRadius: 14, borderWidth: 1, borderColor: "#f5d99a",
        paddingHorizontal: 16, paddingVertical: 14,
        marginBottom: 16,
    },
    registerBannerLeft: {
        flexDirection: "row", alignItems: "center", gap: 12,
    },
    registerBannerTitle: {
        fontSize: 14, fontWeight: "800", color: "#2d2520",
    },
    registerBannerSub: {
        fontSize: 12, color: "#c0b4a4", marginTop: 2,
    },
    menuCard: {
        backgroundColor: "#fff",
        borderRadius: 18,
        borderWidth: 1, borderColor: "#ede8e0",
        overflow: "hidden",
    },
    menuItem: {
        flexDirection: "row", alignItems: "center", gap: 13,
        paddingHorizontal: 16, paddingVertical: 15,
    },
    menuBorder: { borderBottomWidth: 1, borderBottomColor: "#ede8e0" },
    menuIcon: {
        width: 36, height: 36, borderRadius: 10,
        backgroundColor: "#fff3dc",
        alignItems: "center", justifyContent: "center",
    },
    menuLabel: { flex: 1, fontSize: 14, fontWeight: "600", color: "#2d2520" },
});
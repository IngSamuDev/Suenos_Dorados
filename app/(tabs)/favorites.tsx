import { Feather } from "@expo/vector-icons";
<<<<<<< HEAD
import { StyleSheet, Text, View } from "react-native";
import AppHeader from "../../components/header/AppHeader";

export default function Favorites() {
    return (
        <View style={s.root}>
            <AppHeader showSearch={false} title="Favoritos" />
            <View style={s.center}>
                <View style={s.iconWrap}>
                    <Feather name="heart" size={32} color="#f5a742" />
                </View>
                <Text style={s.title}>Sin favoritos aún</Text>
                <Text style={s.sub}>Tocá el corazón en cualquier producto para guardarlo acá</Text>
            </View>
=======
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppHeader from "../../components/header/AppHeader";
import EmptyState from "../../components/ui/EmptyState";
import { useToast } from "../../components/ui/Toast";
import { COLORS } from "../../constants/theme";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { fmt } from "../../utils/format";

export default function Favorites() {
    const router = useRouter();
    const { favorites, toggleFavorite } = useFavorites();
    const { addItem } = useCart();
    const { showToast } = useToast();

    const handleAddToCart = (item: typeof favorites[0]) => {
        addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
        showToast(`${item.name} agregado al carrito 🛒`);
    };

    const handleRemove = (item: typeof favorites[0]) => {
        toggleFavorite(item);
        showToast("Eliminado de favoritos", "info");
    };

    if (favorites.length === 0) {
        return (
            <View style={s.root}>
                <AppHeader showSearch={false} title="Favoritos" />
                <EmptyState
                    icon="heart"
                    title="Sin favoritos aún"
                    subtitle="Tocá el corazón en cualquier producto para guardarlo acá"
                    actionLabel="Ver productos"
                    onAction={() => router.push("/(tabs)/explore" as any)}
                />
            </View>
        );
    }

    return (
        <View style={s.root}>
            <AppHeader showSearch={false} title="Favoritos" />
            <ScrollView
                contentContainerStyle={{ padding: 20, gap: 12 }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={s.count}>
                    {favorites.length} producto{favorites.length !== 1 ? "s" : ""} guardado
                    {favorites.length !== 1 ? "s" : ""}
                </Text>

                {favorites.map((item) => (
                    <View key={item.id} style={s.card}>
                        <Image source={{ uri: item.image }} style={s.thumb} resizeMode="cover" />
                        <View style={{ flex: 1 }}>
                            <Text style={s.name} numberOfLines={2}>{item.name}</Text>
                            <View style={s.priceRow}>
                                <Text style={s.price}>{fmt(item.price)}</Text>
                                {item.originalPrice && (
                                    <Text style={s.priceOrig}>{fmt(item.originalPrice)}</Text>
                                )}
                            </View>
                            <TouchableOpacity style={s.addBtn} onPress={() => handleAddToCart(item)} activeOpacity={0.85}>
                                <Feather name="shopping-cart" size={13} color="#fff" />
                                <Text style={s.addBtnTxt}>Agregar al carrito</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={s.removeBtn} onPress={() => handleRemove(item)}>
                            <Feather name="heart" size={18} color={COLORS.orange} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
>>>>>>> cami-zapata
        </View>
    );
}

const s = StyleSheet.create({
<<<<<<< HEAD
    root: { flex: 1, backgroundColor: "#fffdf9" },
    center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
    iconWrap: {
        width: 72, height: 72, borderRadius: 20,
        backgroundColor: "#fff3dc",
        alignItems: "center", justifyContent: "center",
        borderWidth: 1, borderColor: "#f5e0b0",
    },
    title: { fontSize: 18, fontWeight: "800", color: "#2d2520" },
    sub: { fontSize: 13, color: "#b0a090", textAlign: "center", paddingHorizontal: 40, lineHeight: 20 },
=======
    root: { flex: 1, backgroundColor: COLORS.bg },
    count: { fontSize: 13, color: COLORS.muted, marginBottom: 4 },
    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        backgroundColor: COLORS.card,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 12,
    },
    thumb: { width: 70, height: 70, borderRadius: 12, backgroundColor: COLORS.amber },
    name: { fontSize: 14, fontWeight: "700", color: COLORS.text, lineHeight: 19 },
    priceRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
    price: { fontSize: 14, fontWeight: "800", color: COLORS.orange },
    priceOrig: { fontSize: 12, color: COLORS.muted, textDecorationLine: "line-through" },
    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 8,
        backgroundColor: COLORS.orange,
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 8,
        alignSelf: "flex-start",
    },
    addBtnTxt: { color: "#fff", fontSize: 11, fontWeight: "700" },
    removeBtn: { padding: 8 },
>>>>>>> cami-zapata
});
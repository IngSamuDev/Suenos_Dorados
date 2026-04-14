import { Feather } from "@expo/vector-icons";
<<<<<<< HEAD
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppHeader from "../../components/header/AppHeader";

export default function Cart() {
    return (
        <View style={s.root}>
            <AppHeader showSearch={false} title="Mi carrito" />
            <View style={s.center}>
                <View style={s.iconWrap}>
                    <Feather name="shopping-cart" size={32} color="#f5a742" />
                </View>
                <Text style={s.title}>Tu carrito está vacío</Text>
                <Text style={s.sub}>Agregá productos desde el catálogo para verlos acá</Text>
                <TouchableOpacity style={s.btn}>
                    <Feather name="arrow-left" size={14} color="#fff" />
                    <Text style={s.btnTxt}>Ir a comprar</Text>
=======
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppHeader from "../../components/header/AppHeader";
import EmptyState from "../../components/ui/EmptyState";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrdersContext";
import { useToast } from "../../components/ui/Toast";
import { fmt } from "../../utils/format";
import { COLORS } from "../../constants/theme";

export default function Cart() {
    const router = useRouter();
    const { items, updateQty, clearCart, total } = useCart();
    const { placeOrder } = useOrders();
    const { showToast } = useToast();

    const shipping = total >= 100000 ? 0 : 15000;

    const handleCheckout = async () => {
        if (items.length === 0) return;
        await placeOrder(items, total + shipping);
        clearCart();
        showToast("¡Pedido realizado con éxito! 🎉");
        router.push("/(tabs)/profile" as any);
    };

    if (items.length === 0) {
        return (
            <View style={s.root}>
                <AppHeader showSearch={false} title="Mi carrito" />
                <EmptyState
                    icon="shopping-cart"
                    title="Tu carrito está vacío"
                    subtitle="Agregá productos desde el catálogo para verlos acá"
                    actionLabel="Ir a comprar"
                    onAction={() => router.push("/(tabs)/explore" as any)}
                />
            </View>
        );
    }

    return (
        <View style={s.root}>
            <AppHeader showSearch={false} title="Mi carrito" />

            <ScrollView
                contentContainerStyle={{ padding: 20, gap: 12 }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={s.count}>
                    {items.length} producto{items.length !== 1 ? "s" : ""}
                </Text>

                {items.map((item) => (
                    <View key={item.id} style={s.card}>
                        <Image source={{ uri: item.image }} style={s.thumb} resizeMode="cover" />
                        <View style={{ flex: 1 }}>
                            <Text style={s.name} numberOfLines={2}>{item.name}</Text>
                            <Text style={s.price}>{fmt(item.price)}</Text>
                            <Text style={s.subtotal}>Subtotal: {fmt(item.price * item.qty)}</Text>
                        </View>
                        <View style={s.qtyRow}>
                            <TouchableOpacity style={s.qtyBtn} onPress={() => updateQty(item.id, -1)}>
                                <Feather
                                    name={item.qty === 1 ? "trash-2" : "minus"}
                                    size={14}
                                    color={item.qty === 1 ? COLORS.red : COLORS.text}
                                />
                            </TouchableOpacity>
                            <Text style={s.qtyTxt}>{item.qty}</Text>
                            <TouchableOpacity style={s.qtyBtn} onPress={() => updateQty(item.id, 1)}>
                                <Feather name="plus" size={14} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {/* Resumen */}
                <View style={s.summary}>
                    <View style={s.row}>
                        <Text style={s.summLabel}>Subtotal</Text>
                        <Text style={s.summValue}>{fmt(total)}</Text>
                    </View>
                    <View style={s.row}>
                        <Text style={s.summLabel}>Envío</Text>
                        <Text style={[s.summValue, shipping === 0 && { color: COLORS.green }]}>
                            {shipping === 0 ? "Gratis 🎉" : fmt(shipping)}
                        </Text>
                    </View>
                    {shipping > 0 && (
                        <Text style={s.hint}>
                            Agregá {fmt(100000 - total)} más para envío gratis
                        </Text>
                    )}
                    <View style={[s.row, s.totalRow]}>
                        <Text style={[s.summLabel, { fontWeight: "800", color: COLORS.text }]}>Total</Text>
                        <Text style={[s.summValue, { fontSize: 18, color: COLORS.orange }]}>
                            {fmt(total + shipping)}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <View style={s.footer}>
                <TouchableOpacity style={s.checkoutBtn} onPress={handleCheckout} activeOpacity={0.85}>
                    <Text style={s.checkoutTxt}>Finalizar compra</Text>
                    <Feather name="arrow-right" size={16} color="#fff" />
>>>>>>> cami-zapata
                </TouchableOpacity>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
<<<<<<< HEAD
    root: { flex: 1, backgroundColor: "#fffdf9" },
    center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, paddingHorizontal: 40 },
    iconWrap: {
        width: 72, height: 72, borderRadius: 20,
        backgroundColor: "#fff3dc",
        alignItems: "center", justifyContent: "center",
        borderWidth: 1, borderColor: "#f5e0b0",
        marginBottom: 4,
    },
    title: { fontSize: 18, fontWeight: "800", color: "#2d2520" },
    sub: { fontSize: 13, color: "#b0a090", textAlign: "center", lineHeight: 20 },
    btn: {
        flexDirection: "row", alignItems: "center", gap: 6,
        marginTop: 8,
        backgroundColor: "#f5a742",
        paddingHorizontal: 20, paddingVertical: 12,
        borderRadius: 12,
    },
    btnTxt: { color: "#fff", fontWeight: "700", fontSize: 14 },
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
    thumb: { width: 68, height: 68, borderRadius: 12, backgroundColor: COLORS.amber },
    name: { fontSize: 13, fontWeight: "700", color: COLORS.text, lineHeight: 18, marginBottom: 2 },
    price: { fontSize: 14, fontWeight: "800", color: COLORS.orange },
    subtotal: { fontSize: 11, color: COLORS.muted, marginTop: 2 },
    qtyRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    qtyBtn: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: COLORS.amber,
        borderWidth: 1,
        borderColor: COLORS.amberBorder,
        alignItems: "center",
        justifyContent: "center",
    },
    qtyTxt: { fontSize: 15, fontWeight: "800", color: COLORS.text, minWidth: 20, textAlign: "center" },
    summary: {
        backgroundColor: COLORS.card,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 16,
        gap: 8,
        marginTop: 4,
    },
    row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    totalRow: { marginTop: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.border },
    summLabel: { fontSize: 14, color: COLORS.muted },
    summValue: { fontSize: 15, fontWeight: "700", color: COLORS.text },
    hint: { fontSize: 12, color: COLORS.orange, marginTop: 2 },
    footer: {
        padding: 20,
        paddingBottom: 28,
        backgroundColor: COLORS.bg,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    checkoutBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: COLORS.orange,
        borderRadius: 16,
        height: 54,
        elevation: 6,
    },
    checkoutTxt: { color: "#fff", fontSize: 16, fontWeight: "800" },
>>>>>>> cami-zapata
});
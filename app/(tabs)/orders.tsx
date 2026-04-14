import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EmptyState from "../../components/ui/EmptyState";
import { COLORS } from "../../constants/theme";
import { useOrders } from "../../context/OrdersContext";
import { fmt, fmtDate, orderStatusColor, orderStatusLabel } from "../../utils/format";

export default function Orders() {
    const router = useRouter();
    const { orders } = useOrders();

    return (
        <View style={s.root}>
            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
                    <Feather name="arrow-left" size={20} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={s.title}>Mis pedidos</Text>
                <View style={{ width: 40 }} />
            </View>

            {orders.length === 0 ? (
                <EmptyState
                    icon="package"
                    title="Sin pedidos aún"
                    subtitle="Tus pedidos aparecerán aquí una vez que realices una compra"
                    actionLabel="Ir a comprar"
                    onAction={() => router.push("/(tabs)/(stacks)/" as any)}
                />
            ) : (
                <ScrollView
                    contentContainerStyle={{ padding: 20, gap: 14 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={s.count}>{orders.length} pedido{orders.length !== 1 ? "s" : ""}</Text>

                    {orders.map((order) => (
                        <View key={order.id} style={s.card}>
                            {/* Cabecera del pedido */}
                            <View style={s.cardHeader}>
                                <View>
                                    <Text style={s.orderId}>{order.id}</Text>
                                    <Text style={s.orderDate}>{fmtDate(order.date)}</Text>
                                </View>
                                <View style={[s.statusBadge, { backgroundColor: orderStatusColor(order.status) + "20" }]}>
                                    <View style={[s.statusDot, { backgroundColor: orderStatusColor(order.status) }]} />
                                    <Text style={[s.statusTxt, { color: orderStatusColor(order.status) }]}>
                                        {orderStatusLabel(order.status)}
                                    </Text>
                                </View>
                            </View>

                            {/* Items del pedido */}
                            <View style={s.divider} />
                            {order.items.map((item) => (
                                <View key={item.id} style={s.itemRow}>
                                    <View style={s.itemQtyBadge}>
                                        <Text style={s.itemQtyTxt}>{item.qty}x</Text>
                                    </View>
                                    <Text style={s.itemName} numberOfLines={1}>{item.name}</Text>
                                    <Text style={s.itemPrice}>{fmt(item.price * item.qty)}</Text>
                                </View>
                            ))}

                            {/* Total */}
                            <View style={s.divider} />
                            <View style={s.totalRow}>
                                <Text style={s.totalLabel}>Total pagado</Text>
                                <Text style={s.totalValue}>{fmt(order.total)}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}
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
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
    },
    title: { fontSize: 17, fontWeight: "800", color: COLORS.text },
    count: { fontSize: 13, color: COLORS.muted, marginBottom: 4 },
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 16,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    orderId: { fontSize: 13, fontWeight: "800", color: COLORS.text },
    orderDate: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },
    statusDot: { width: 6, height: 6, borderRadius: 3 },
    statusTxt: { fontSize: 11, fontWeight: "700" },
    divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 10 },
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 4,
    },
    itemQtyBadge: {
        backgroundColor: COLORS.amber,
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 6,
    },
    itemQtyTxt: { fontSize: 11, fontWeight: "700", color: COLORS.amberAccent },
    itemName: { flex: 1, fontSize: 13, color: COLORS.text, fontWeight: "500" },
    itemPrice: { fontSize: 13, fontWeight: "700", color: COLORS.text },
    totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    totalLabel: { fontSize: 14, color: COLORS.muted },
    totalValue: { fontSize: 16, fontWeight: "800", color: COLORS.orange },
});
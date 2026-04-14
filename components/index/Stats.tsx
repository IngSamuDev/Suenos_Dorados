import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/theme";

const STATS = [
    { icon: "truck" as const, label: "Envío gratis", sub: "+$100.000" },
    { icon: "refresh-cw" as const, label: "Devolución", sub: "30 días" },
    { icon: "star" as const, label: "Valoración", sub: "4.9 / 5" },
];

export default function Stats() {
    return (
        <View style={s.row}>
            {STATS.map((item, i) => (
                <View key={i} style={[s.item, i < 2 && s.border]}>
                    <Feather name={item.icon} size={16} color={COLORS.orange} />
                    <Text style={s.label}>{item.label}</Text>
                    <Text style={s.sub}>{item.sub}</Text>
                </View>
            ))}
        </View>
    );
}

const s = StyleSheet.create({
    row: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginBottom: 24,
        backgroundColor: COLORS.card,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingVertical: 14,
    },
    item: { flex: 1, alignItems: "center", gap: 4 },
    border: { borderRightWidth: 1, borderRightColor: COLORS.border },
    label: { fontSize: 11, fontWeight: "700", color: COLORS.text },
    sub: { fontSize: 10, color: COLORS.muted },
});
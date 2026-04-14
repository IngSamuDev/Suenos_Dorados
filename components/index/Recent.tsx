import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RECENT_PRODUCTS } from "../../constants/products";
import { COLORS } from "../../constants/theme";
import ProductCard from "../ui/ProductCard";

export default function Recent() {
  const router = useRouter();

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View style={s.secRow}>
        <Text style={s.secTitle}>Recién agregados</Text>
        <TouchableOpacity
          style={s.secLink}
          onPress={() => router.push("/(tabs)/explore" as any)}
        >
          <Text style={s.secLinkTxt}>Ver todo</Text>
          <Feather name="chevron-right" size={14} color={COLORS.orange} />
        </TouchableOpacity>
      </View>

      <View style={{ gap: 10 }}>
        {RECENT_PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} variant="list" />
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  secRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  secTitle: { fontSize: 17, fontWeight: "800", color: COLORS.text },
  secLink: { flexDirection: "row", alignItems: "center", gap: 2 },
  secLinkTxt: { fontSize: 13, color: COLORS.orange, fontWeight: "600" },
});
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FEATURED_PRODUCTS } from "../../constants/products";
import { COLORS } from "../../constants/theme";
import ProductCard from "../ui/ProductCard";

export default function Featured() {
  const router = useRouter();

  return (
    <View style={{ marginBottom: 32 }}>
      <View style={s.secRow}>
        <Text style={s.secTitle}>Más vendidos</Text>
        <TouchableOpacity
          style={s.secLink}
          onPress={() => router.push("/(tabs)/explore" as any)}
        >
          <Text style={s.secLinkTxt}>Ver todo</Text>
          <Feather name="chevron-right" size={14} color={COLORS.orange} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
      >
        {FEATURED_PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} variant="featured" />
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  secRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  secTitle: { fontSize: 17, fontWeight: "800", color: COLORS.text },
  secLink: { flexDirection: "row", alignItems: "center", gap: 2 },
  secLinkTxt: { fontSize: 13, color: COLORS.orange, fontWeight: "600" },
});
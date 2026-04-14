import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ALL_PRODUCTS } from "../../constants/products";
import { COLORS } from "../../constants/theme";
import ProductCard from "../ui/ProductCard";

interface Props {
  categoryFilter?: string;
}

export default function Featured({ categoryFilter = "Todo" }: Props) {
  const router = useRouter();

  const products = ALL_PRODUCTS.filter((p) => {
    const hasImage = !!p.image;
    const matchCat = categoryFilter === "Todo" || p.category === categoryFilter;
    return hasImage && matchCat;
  }).slice(0, 6); // máximo 6 en el scroll horizontal

  if (products.length === 0) return null;

  return (
    <View style={{ marginBottom: 32 }}>
      <View style={s.secRow}>
        <Text style={s.secTitle}>
          {categoryFilter === "Todo" ? "Más vendidos" : categoryFilter}
        </Text>
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
        {products.map((p) => (
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
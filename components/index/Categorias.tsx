import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/theme";

const CATEGORIES = [
  { id: "1", label: "Todo" },
  { id: "2", label: "Edredones" },
  { id: "3", label: "Cobijas" },
  { id: "4", label: "Almohadas" },
  { id: "5", label: "Ofertas" },
];

interface Props {
  active: string;
  onSelect: (id: string) => void;
}

export default function Categorias({ active, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.scroll}
      style={{ marginBottom: 28 }}
    >
      {CATEGORIES.map((cat) => {
        const isActive = active === cat.id;
        return (
          <TouchableOpacity
            key={cat.id}
            onPress={() => onSelect(cat.id)}
            style={[s.chip, isActive && s.chipActive]}
          >
            <Text style={[s.chipTxt, isActive && s.chipTxtActive]}>{cat.label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { paddingHorizontal: 20, gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: { backgroundColor: COLORS.amber, borderColor: COLORS.amberBorder },
  chipTxt: { fontSize: 13, fontWeight: "600", color: COLORS.muted },
  chipTxtActive: { color: COLORS.amberAccent, fontWeight: "700" },
});
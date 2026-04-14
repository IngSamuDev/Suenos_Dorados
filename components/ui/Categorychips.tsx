import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { CATEGORIES } from "../../constants/products";
import { COLORS } from "../../constants/theme";

interface Props {
    active: string;
    onSelect: (cat: string) => void;
    /** true = usa IDs numéricos (Home), false = usa nombres directos (Explore) */
    useIds?: boolean;
}

// Mapeo id → nombre para el Home
const CAT_BY_ID: Record<string, string> = {
    "1": "Todo",
    "2": "Edredones",
    "3": "Cobijas",
    "4": "Almohadas",
    "5": "Accesorios",
};

export default function CategoryChips({ active, onSelect, useIds = false }: Props) {
    const items = useIds
        ? Object.entries(CAT_BY_ID).map(([id, label]) => ({ key: id, label }))
        : CATEGORIES.map((c) => ({ key: c, label: c }));

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.scroll}
        >
            {items.map((item) => {
                const isActive = active === item.key;
                return (
                    <TouchableOpacity
                        key={item.key}
                        onPress={() => onSelect(item.key)}
                        style={[s.chip, isActive && s.chipActive]}
                        activeOpacity={0.75}
                    >
                        <Text style={[s.chipTxt, isActive && s.chipTxtActive]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

const s = StyleSheet.create({
    scroll: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 8,
        alignItems: "center",   // ← evita que los chips se estiren en altura
    },
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 20,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        // altura fija para que nunca crezcan
        alignSelf: "flex-start",
    },
    chipActive: {
        backgroundColor: COLORS.amber,
        borderColor: COLORS.amberBorder,
    },
    chipTxt: {
        fontSize: 13,
        fontWeight: "600",
        color: COLORS.mutedDark,
        lineHeight: 18,
    },
    chipTxtActive: {
        color: COLORS.amberAccent,
        fontWeight: "700",
    },
});
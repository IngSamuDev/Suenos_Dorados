import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ProductCard from "../../components/ui/ProductCard";
import { ALL_PRODUCTS, CATEGORIES } from "../../constants/products";
import { COLORS } from "../../constants/theme";

export default function Explore() {
    const router = useRouter();
    const inputRef = useRef<TextInput>(null);
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("Todo");

    useEffect(() => {
        const t = setTimeout(() => inputRef.current?.focus(), 150);
        return () => clearTimeout(t);
    }, []);

    const filtered = ALL_PRODUCTS.filter((p) => {
        const matchCat = category === "Todo" || p.category === category;
        const matchText = p.name.toLowerCase().includes(query.toLowerCase());
        return matchCat && matchText;
    });

    return (
        <View style={s.root}>
            {/* ── Header con buscador ──────────────────────── */}
            <View style={s.header}>
                <TouchableOpacity style={s.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
                    <Feather name="arrow-left" size={20} color={COLORS.text} />
                </TouchableOpacity>
                <View style={s.searchWrap}>
                    <Feather name="search" size={15} color={COLORS.mutedDark} style={{ marginRight: 10 }} />
                    <TextInput
                        ref={inputRef}
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Buscar edredones, cobijas..."
                        placeholderTextColor={COLORS.mutedDark}
                        style={s.input}
                        autoCorrect={false}
                        autoCapitalize="none"
                    />
                    {query.length > 0 && (
                        <TouchableOpacity onPress={() => setQuery("")}>
                            <Feather name="x" size={16} color={COLORS.mutedDark} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* ── Categorías ───────────────────────────────── */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={s.catScroll}
            >
                {CATEGORIES.map((cat) => (
                    <TouchableOpacity
                        key={cat}
                        onPress={() => setCategory(cat)}
                        style={[s.chip, category === cat && s.chipActive]}
                    >
                        <Text style={[s.chipTxt, category === cat && s.chipTxtActive]}>{cat}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* ── Resultados ───────────────────────────────── */}
            {filtered.length === 0 ? (
                <View style={s.noResult}>
                    <Feather name="search" size={28} color={COLORS.mutedDark} />
                    <Text style={s.noResultTxt}>Sin resultados para "{query}"</Text>
                </View>
            ) : (
                <ScrollView
                    contentContainerStyle={s.grid}
                    showsVerticalScrollIndicator={false}
                >
                    {filtered.map((p) => (
                        <ProductCard key={p.id} product={p} variant="grid" />
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
        gap: 12,
        paddingHorizontal: 20,
        paddingTop: 52,
        paddingBottom: 14,
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
    searchWrap: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 11,
    },
    input: { flex: 1, fontSize: 14, color: COLORS.text },
    catScroll: { paddingHorizontal: 20, paddingVertical: 14, gap: 8 },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    chipActive: { backgroundColor: COLORS.amber, borderColor: COLORS.amberBorder },
    chipTxt: { fontSize: 13, fontWeight: "600", color: COLORS.mutedDark },
    chipTxtActive: { color: COLORS.amberAccent, fontWeight: "700" },
    grid: {
        padding: 16,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    noResult: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
    noResultTxt: { fontSize: 14, color: COLORS.mutedDark },
});
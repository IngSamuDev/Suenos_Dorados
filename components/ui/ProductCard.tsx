import { Feather } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useToast } from "./Toast";
import { fmt, pct } from "../../utils/format";
import { Product } from "../../constants/products";
import { COLORS } from "../../constants/theme";

interface Props {
    product: Product;
    variant?: "featured" | "grid" | "list";
}

export default function ProductCard({ product, variant = "featured" }: Props) {
    const { addItem } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();
    const { showToast } = useToast();
    const fav = isFavorite(product.id);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        });
        showToast(`${product.name} agregado al carrito 🛒`);
    };

    const handleToggleFavorite = () => {
        toggleFavorite({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
        });
        showToast(
            fav ? "Eliminado de favoritos" : "Agregado a favoritos ❤️",
            fav ? "info" : "success"
        );
    };

    // ── Featured (horizontal scroll) ─────────────────────────────────────────
    if (variant === "featured") {
        return (
            <View style={s.featCard}>
                <View style={[s.featImg, { backgroundColor: product.cardBg ?? COLORS.amber }]}>
                    <Image source={{ uri: product.image }} style={StyleSheet.absoluteFill} resizeMode="cover" />
                    {product.badge && (
                        <View style={s.badge}>
                            <Text style={s.badgeTxt}>{product.badge}</Text>
                        </View>
                    )}
                    {product.originalPrice && (
                        <View style={[s.pctBadge, { backgroundColor: product.accent ?? COLORS.orange }]}>
                            <Text style={s.pctTxt}>{pct(product.originalPrice, product.price)}</Text>
                        </View>
                    )}
                    <TouchableOpacity style={[s.favBtn, fav && s.favBtnActive]} onPress={handleToggleFavorite}>
                        <Feather name="heart" size={13} color={fav ? COLORS.orange : COLORS.muted} />
                    </TouchableOpacity>
                </View>
                <View style={s.featBody}>
                    <Text style={s.featName} numberOfLines={2}>{product.name}</Text>
                    <Text style={s.featDesc} numberOfLines={1}>{product.desc}</Text>
                    <View style={s.priceRow}>
                        <Text style={s.priceSale}>{fmt(product.price)}</Text>
                        {product.originalPrice && (
                            <Text style={s.priceOrig}>{fmt(product.originalPrice)}</Text>
                        )}
                    </View>
                    <TouchableOpacity style={s.addBtn} onPress={handleAddToCart} activeOpacity={0.85}>
                        <Feather name="shopping-cart" size={13} color="#fff" />
                        <Text style={s.addBtnTxt}>Agregar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // ── Grid (explore 2 col) ──────────────────────────────────────────────────
    if (variant === "grid") {
        return (
            <View style={s.gridCard}>
                <View style={s.gridImgWrap}>
                    <Image source={{ uri: product.image }} style={s.gridImg} resizeMode="cover" />
                    <TouchableOpacity style={[s.favBtnGrid, fav && s.favBtnActive]} onPress={handleToggleFavorite}>
                        <Feather name="heart" size={12} color={fav ? COLORS.orange : COLORS.muted} />
                    </TouchableOpacity>
                </View>
                <View style={s.gridBody}>
                    <Text style={s.catTxt}>{product.category}</Text>
                    <Text style={s.gridName} numberOfLines={2}>{product.name}</Text>
                    <Text style={s.priceSale}>{fmt(product.price)}</Text>
                    <TouchableOpacity style={s.addBtnSm} onPress={handleAddToCart} activeOpacity={0.85}>
                        <Feather name="shopping-cart" size={12} color="#fff" />
                        <Text style={s.addBtnSmTxt}>Agregar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // ── List (recent) ─────────────────────────────────────────────────────────
    return (
        <TouchableOpacity style={s.listCard} activeOpacity={0.85}>
            <View style={s.listThumb}>
                <Image source={{ uri: product.image }} style={StyleSheet.absoluteFill} resizeMode="cover" borderRadius={12} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={s.listName}>{product.name}</Text>
                <View style={s.priceRow}>
                    <Text style={s.priceSale}>{fmt(product.price)}</Text>
                    {product.originalPrice && (
                        <Text style={s.priceOrig}>{fmt(product.originalPrice)}</Text>
                    )}
                </View>
            </View>
            <TouchableOpacity style={s.plusBtn} onPress={handleAddToCart}>
                <Feather name="plus" size={18} color={COLORS.orange} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
    // Featured
    featCard: {
        width: 186,
        backgroundColor: COLORS.card,
        borderRadius: 18,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    featImg: {
        height: 150,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    badge: {
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: "rgba(255,255,255,0.92)",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
        zIndex: 1,
    },
    badgeTxt: { fontSize: 10, fontWeight: "700", color: COLORS.text },
    pctBadge: {
        position: "absolute",
        top: 10,
        right: 36,
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 8,
        zIndex: 1,
    },
    pctTxt: { fontSize: 10, fontWeight: "800", color: "#fff" },
    favBtn: {
        position: "absolute",
        bottom: 10,
        right: 10,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "rgba(255,255,255,0.9)",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
        zIndex: 1,
    },
    favBtnActive: { backgroundColor: COLORS.amber, borderColor: COLORS.amberBorder },
    featBody: { padding: 13 },
    featName: { fontSize: 13, fontWeight: "700", color: COLORS.text, lineHeight: 18, marginBottom: 2 },
    featDesc: { fontSize: 11, color: COLORS.muted, marginBottom: 8 },
    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        marginTop: 4,
        backgroundColor: COLORS.orange,
        borderRadius: 9,
        paddingVertical: 9,
    },
    addBtnTxt: { color: "#fff", fontSize: 12, fontWeight: "700" },

    // Grid
    gridCard: {
        width: "47%",
        backgroundColor: COLORS.card,
        borderRadius: 16,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    gridImgWrap: { position: "relative" },
    gridImg: { width: "100%", height: 130 },
    favBtnGrid: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: "rgba(255,255,255,0.9)",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    gridBody: { padding: 10 },
    catTxt: {
        fontSize: 10,
        color: COLORS.muted,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    gridName: { fontSize: 13, fontWeight: "700", color: COLORS.text, lineHeight: 17, marginBottom: 6 },
    addBtnSm: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: COLORS.orange,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 8,
        alignSelf: "flex-start",
        marginTop: 6,
    },
    addBtnSmTxt: { color: "#fff", fontSize: 11, fontWeight: "700" },

    // List
    listCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 13,
        backgroundColor: COLORS.card,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 13,
    },
    listThumb: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: COLORS.amber,
        overflow: "hidden",
    },
    listName: { fontSize: 14, fontWeight: "600", color: COLORS.text, marginBottom: 4 },
    plusBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: COLORS.amber,
        borderWidth: 1,
        borderColor: COLORS.amberBorder,
        alignItems: "center",
        justifyContent: "center",
    },

    // Shared
    priceRow: { flexDirection: "row", alignItems: "center", gap: 7, marginTop: 2 },
    priceSale: { fontSize: 14, fontWeight: "800", color: COLORS.orange },
    priceOrig: { fontSize: 12, color: COLORS.muted, textDecorationLine: "line-through" },
});
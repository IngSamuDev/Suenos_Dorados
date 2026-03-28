import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const FEATURED = [
  {
    id: "1",
    name: "Edredón Nórdico Premium",
    desc: "Relleno de microfibra, doble funda",
    price: 85000,
    originalPrice: 110000,
    badge: "Más vendido",
    image: "https://via.placeholder.com/400x300/fff3dc/f5a742?text=Edredon",
  },
  {
    id: "2",
    name: "Cobija Sherpa Ultra Soft",
    desc: "Suavidad extrema, ideal para invierno",
    price: 45000,
    originalPrice: 60000,
    badge: "Nuevo",
    image: "https://via.placeholder.com/400x300/e8f0ff/5b9bd5?text=Cobija",
  },
  {
    id: "3",
    name: "Set King Size Plumas",
    desc: "Edredón + 2 almohadas + funda",
    price: 130000,
    originalPrice: 160000,
    badge: "Premium",
    image: "https://via.placeholder.com/400x300/f5f0ff/9b72cf?text=Set+King",
  },
];

const RECENT = [
  {
    id: "4",
    name: "Almohada Viscoelástica",
    price: 28000,
    originalPrice: null,
    image: "https://via.placeholder.com/100x100/fff3dc/f5a742?text=Almohada",
  },
  {
    id: "5",
    name: "Protector de Colchón",
    price: 19000,
    originalPrice: 25000,
    image: "https://via.placeholder.com/100x100/fff3dc/f5a742?text=Protector",
  },
  {
    id: "6",
    name: "Funda Nórdica 2 pzs",
    price: 35000,
    originalPrice: 42000,
    image: "https://via.placeholder.com/100x100/fff3dc/f5a742?text=Funda",
  },
  {
    id: "7",
    name: "Cobija Bebé Fleece",
    price: 14000,
    originalPrice: null,
    image: "https://via.placeholder.com/100x100/fff3dc/f5a742?text=Bebe",
  },
];

const CATEGORIES = [
  { id: "1", label: "Todo" },
  { id: "2", label: "Edredones" },
  { id: "3", label: "Cobijas" },
  { id: "4", label: "Almohadas" },
  { id: "5", label: "Ofertas" },
];

function fmt(n: number) {
  return "$" + n.toLocaleString("es-CO");
}
function pct(orig: number, sale: number) {
  return "-" + Math.round((1 - sale / orig) * 100) + "%";
}

const BG = "#fffdf9";
const CARD = "#ffffff";
const BORDER = "#ede8e0";
const TEXT = "#2d2520";
const MUTED = "#b0a090";
const ORANGE = "#f5a742";
const AMBER = "#fff3dc";

export default function Home() {
  const [activeCat, setActiveCat] = useState("1");
  const router = useRouter();

  return (
    <View style={s.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* ── Hero ─────────────────────────────── */}
        <View style={s.hero}>
          <View style={s.heroLeft}>
            <View style={s.heroChip}>
              <Text style={s.heroChipTxt}>Invierno 2025</Text>
            </View>
            <Text style={s.heroTitle}>El descanso{"\n"}que merecés</Text>
            <Text style={s.heroSub}>Hasta 30% off en toda la colección</Text>
            <TouchableOpacity style={s.heroCta}>
              <Text style={s.heroCtaTxt}>Ver colección</Text>
              <Feather name="arrow-right" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={s.heroRight}>
            <Feather name="moon" size={52} color={ORANGE} style={{ opacity: 0.2 }} />
          </View>
        </View>

        {/* ── Stats ────────────────────────────── */}
        <View style={s.statsRow}>
          {[
            { icon: "truck" as const, label: "Envío gratis", sub: "+$100.000" },
            { icon: "refresh-cw" as const, label: "Devolución", sub: "30 días" },
            { icon: "star" as const, label: "Valoración", sub: "4.9 / 5" },
          ].map((item, i) => (
            <View key={i} style={[s.statItem, i < 2 && s.statBorder]}>
              <Feather name={item.icon} size={16} color={ORANGE} />
              <Text style={s.statLabel}>{item.label}</Text>
              <Text style={s.statSub}>{item.sub}</Text>
            </View>
          ))}
        </View>

        {/* ── Categorías ───────────────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.catScroll}
          style={{ marginBottom: 28 }}
        >
          {CATEGORIES.map((cat) => {
            const active = activeCat === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setActiveCat(cat.id)}
                style={[s.chip, active && s.chipActive]}
              >
                <Text style={[s.chipTxt, active && s.chipTxtActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ── Más vendidos ─────────────────────── */}
        <View style={{ marginBottom: 32 }}>
          <View style={s.secRow}>
            <Text style={s.secTitle}>Más vendidos</Text>
            <TouchableOpacity style={s.secLink}>
              <Text style={s.secLinkTxt}>Ver todo</Text>
              <Feather name="chevron-right" size={14} color={ORANGE} />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
          >
            {FEATURED.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={s.featCard}
                activeOpacity={0.9}
                onPress={() => router.push("/(tabs)/(stacks)/product" as any)}
              >
                {/* Imagen real */}
                <View style={s.featImgWrap}>
                  <Image
                    source={{ uri: p.image }}
                    style={s.featImg}
                    resizeMode="cover"
                  />
                  <View style={s.featBadge}>
                    <Text style={s.featBadgeTxt}>{p.badge}</Text>
                  </View>
                  {p.originalPrice && (
                    <View style={s.featPct}>
                      <Text style={s.featPctTxt}>{pct(p.originalPrice, p.price)}</Text>
                    </View>
                  )}
                  <TouchableOpacity style={s.featFav}>
                    <Feather name="heart" size={13} color={MUTED} />
                  </TouchableOpacity>
                </View>

                {/* Info */}
                <View style={s.featBody}>
                  <Text style={s.featName} numberOfLines={2}>{p.name}</Text>
                  <Text style={s.featDesc} numberOfLines={1}>{p.desc}</Text>
                  <View style={s.priceRow}>
                    <Text style={s.priceSale}>{fmt(p.price)}</Text>
                    {p.originalPrice && (
                      <Text style={s.priceOrig}>{fmt(p.originalPrice)}</Text>
                    )}
                  </View>
                  <TouchableOpacity style={s.addBtn}>
                    <Feather name="shopping-cart" size={13} color="#fff" />
                    <Text style={s.addBtnTxt}>Agregar</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── Banner promo ─────────────────────── */}
        <TouchableOpacity style={s.promoBanner} activeOpacity={0.8}>
          <View style={s.promoIcon}>
            <Feather name="truck" size={22} color={ORANGE} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.promoTitle}>Envío gratis a toda Colombia</Text>
            <Text style={s.promoSub}>En compras mayores a $100.000 COP</Text>
          </View>
          <Feather name="chevron-right" size={16} color={MUTED} />
        </TouchableOpacity>

        {/* ── Recién agregados ─────────────────── */}
        <View style={{ paddingHorizontal: 20 }}>
          <View style={s.secRow}>
            <Text style={s.secTitle}>Recién agregados</Text>
            <TouchableOpacity style={s.secLink}>
              <Text style={s.secLinkTxt}>Ver todo</Text>
              <Feather name="chevron-right" size={14} color={ORANGE} />
            </TouchableOpacity>
          </View>

          <View style={{ gap: 10 }}>
            {RECENT.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={s.recentCard}
                activeOpacity={0.8}
                onPress={() => router.push("/(tabs)/(stacks)/product" as any)}
              >
                {/* Imagen real */}
                <Image
                  source={{ uri: p.image }}
                  style={s.recentThumb}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text style={s.recentName}>{p.name}</Text>
                  <View style={s.priceRow}>
                    <Text style={s.priceSale}>{fmt(p.price)}</Text>
                    {p.originalPrice && (
                      <Text style={s.priceOrig}>{fmt(p.originalPrice)}</Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity style={s.plusBtn}>
                  <Feather name="plus" size={18} color={ORANGE} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },

  // Hero
  hero: {
    margin: 20, marginBottom: 16,
    backgroundColor: AMBER,
    borderRadius: 20, padding: 22,
    flexDirection: "row", alignItems: "center",
    borderWidth: 1, borderColor: "#f5e0b0",
  },
  heroLeft: { flex: 1 },
  heroRight: { paddingLeft: 10 },
  heroChip: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4,
    marginBottom: 10,
    borderWidth: 1, borderColor: BORDER,
  },
  heroChipTxt: { fontSize: 11, fontWeight: "700", color: MUTED },
  heroTitle: {
    fontSize: 24, fontWeight: "900", color: TEXT,
    lineHeight: 28, marginBottom: 8,
  },
  heroSub: { fontSize: 13, color: MUTED, marginBottom: 18, lineHeight: 18 },
  heroCta: {
    flexDirection: "row", alignItems: "center", gap: 6,
    alignSelf: "flex-start",
    backgroundColor: ORANGE,
    paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 10,
  },
  heroCtaTxt: { color: "#fff", fontSize: 13, fontWeight: "700" },

  // Stats
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 20, marginBottom: 24,
    backgroundColor: CARD,
    borderRadius: 16, borderWidth: 1, borderColor: BORDER,
    paddingVertical: 14,
  },
  statItem: { flex: 1, alignItems: "center", gap: 4 },
  statBorder: { borderRightWidth: 1, borderRightColor: BORDER },
  statLabel: { fontSize: 11, fontWeight: "700", color: TEXT },
  statSub: { fontSize: 10, color: MUTED },

  // Categories
  catScroll: { paddingHorizontal: 20, gap: 8 },
  chip: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: CARD,
    borderWidth: 1, borderColor: BORDER,
  },
  chipActive: { backgroundColor: AMBER, borderColor: "#f5d99a" },
  chipTxt: { fontSize: 13, fontWeight: "600", color: MUTED },
  chipTxtActive: { color: "#9a5c00", fontWeight: "700" },

  // Section header
  secRow: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 20, marginBottom: 14,
  },
  secTitle: { fontSize: 17, fontWeight: "800", color: TEXT },
  secLink: { flexDirection: "row", alignItems: "center", gap: 2 },
  secLinkTxt: { fontSize: 13, color: ORANGE, fontWeight: "600" },

  // Featured cards
  featCard: {
    width: 186,
    backgroundColor: CARD,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1, borderColor: BORDER,
  },
  featImgWrap: {
    height: 160,
    position: "relative",
  },
  featImg: {
    width: "100%",
    height: "100%",
  },
  featBadge: {
    position: "absolute", top: 10, left: 10,
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 8,
  },
  featBadgeTxt: { fontSize: 10, fontWeight: "700", color: TEXT },
  featPct: {
    position: "absolute", top: 10, right: 10,
    backgroundColor: ORANGE,
    paddingHorizontal: 7, paddingVertical: 3,
    borderRadius: 8,
  },
  featPctTxt: { fontSize: 10, fontWeight: "800", color: "#fff" },
  featFav: {
    position: "absolute", bottom: 10, right: 10,
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: BORDER,
  },
  featBody: { padding: 13 },
  featName: { fontSize: 13, fontWeight: "700", color: TEXT, lineHeight: 18, marginBottom: 2 },
  featDesc: { fontSize: 11, color: MUTED, marginBottom: 8 },
  addBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6,
    marginTop: 4,
    backgroundColor: ORANGE,
    borderRadius: 9, paddingVertical: 9,
  },
  addBtnTxt: { color: "#fff", fontSize: 12, fontWeight: "700" },

  // Promo banner
  promoBanner: {
    flexDirection: "row", alignItems: "center", gap: 14,
    marginHorizontal: 20, marginBottom: 28,
    backgroundColor: CARD,
    borderRadius: 16, borderWidth: 1, borderColor: BORDER,
    padding: 16,
  },
  promoIcon: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: AMBER,
    alignItems: "center", justifyContent: "center",
  },
  promoTitle: { fontSize: 14, fontWeight: "700", color: TEXT, marginBottom: 2 },
  promoSub: { fontSize: 12, color: MUTED },

  // Prices
  priceRow: { flexDirection: "row", alignItems: "center", gap: 7, marginTop: 2 },
  priceSale: { fontSize: 14, fontWeight: "800", color: ORANGE },
  priceOrig: { fontSize: 12, color: MUTED, textDecorationLine: "line-through" },

  // Recent
  recentCard: {
    flexDirection: "row", alignItems: "center", gap: 13,
    backgroundColor: CARD,
    borderRadius: 14, borderWidth: 1, borderColor: BORDER,
    padding: 10,
  },
  recentThumb: {
    width: 58, height: 58,
    borderRadius: 12,
    backgroundColor: AMBER,
  },
  recentName: { fontSize: 14, fontWeight: "600", color: TEXT, marginBottom: 4 },
  plusBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: AMBER,
    borderWidth: 1, borderColor: "#f5d99a",
    alignItems: "center", justifyContent: "center",
  },
});
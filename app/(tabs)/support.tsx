import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, RADIUS } from "../../constants/theme";

// ─── Datos ────────────────────────────────────────────────────────────────────
const CONTACT = [
    {
        icon: "message-circle" as const,
        label: "Chat en vivo",
        sub: "Respondemos en minutos",
        action: () => { },
    },
    {
        icon: "mail" as const,
        label: "Enviar un correo",
        sub: "soporte@suenosDorados.com",
        action: () => Linking.openURL("mailto:soporte@suenosDorados.com"),
    },
    {
        icon: "phone" as const,
        label: "Llamar al soporte",
        sub: "+57 300 123 4567",
        action: () => Linking.openURL("tel:+573001234567"),
    },
];

const FAQS = [
    {
        q: "¿Cuánto tarda el envío?",
        a: "Los envíos demoran entre 3 y 5 días hábiles dependiendo de tu ciudad.",
    },
    {
        q: "¿Puedo devolver un producto?",
        a: "Sí, tenés 30 días desde la entrega para hacer una devolución sin costo.",
    },
    {
        q: "¿Cómo hago seguimiento de mi pedido?",
        a: "En la sección 'Mis pedidos' podés ver el estado de cada uno en tiempo real.",
    },
    {
        q: "¿Qué métodos de pago aceptan?",
        a: "Aceptamos tarjetas débito/crédito, PSE, Nequi y pago contra entrega.",
    },
    {
        q: "¿Tienen garantía los productos?",
        a: "Todos nuestros productos tienen garantía de 6 meses por defectos de fábrica.",
    },
];

export default function Support() {
    const router = useRouter();

    return (
        <View style={s.root}>
            {/* ── Header con retroceso ── */}
            <View style={s.header}>
                <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
                    <Feather name="arrow-left" size={20} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={s.title}>Ayuda y soporte</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

                {/* ── Contacto ────────────────────────────── */}
                <Text style={s.sectionTitle}>Contáctanos</Text>
                <View style={s.contactCard}>
                    {CONTACT.map((item, i) => (
                        <TouchableOpacity
                            key={item.label}
                            style={[s.contactRow, i < CONTACT.length - 1 && s.contactBorder]}
                            onPress={item.action}
                            activeOpacity={0.7}
                        >
                            <View style={s.contactIcon}>
                                <Feather name={item.icon} size={18} color={COLORS.orange} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={s.contactLabel}>{item.label}</Text>
                                <Text style={s.contactSub}>{item.sub}</Text>
                            </View>
                            <Feather name="chevron-right" size={16} color={COLORS.mutedDark} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ── FAQ ─────────────────────────────────── */}
                <Text style={[s.sectionTitle, { marginTop: 28 }]}>Preguntas frecuentes</Text>
                <View style={s.faqCard}>
                    {FAQS.map((faq, i) => (
                        <View key={i} style={[s.faqItem, i < FAQS.length - 1 && s.faqBorder]}>
                            <View style={s.faqQ}>
                                <Feather name="help-circle" size={16} color={COLORS.orange} style={{ marginTop: 1 }} />
                                <Text style={s.faqQTxt}>{faq.q}</Text>
                            </View>
                            <Text style={s.faqA}>{faq.a}</Text>
                        </View>
                    ))}
                </View>

            </ScrollView>
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
        width: 40, height: 40,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
    },
    title: { fontSize: 17, fontWeight: "800", color: COLORS.text },
    scroll: { padding: 20, paddingBottom: 100 },
    sectionTitle: { fontSize: 15, fontWeight: "800", color: COLORS.text, marginBottom: 12 },

    // Contacto
    contactCard: {
        backgroundColor: COLORS.card,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: "hidden",
    },
    contactRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        padding: 16,
    },
    contactBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
    contactIcon: {
        width: 40, height: 40,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.amber,
        alignItems: "center",
        justifyContent: "center",
    },
    contactLabel: { fontSize: 14, fontWeight: "700", color: COLORS.text },
    contactSub: { fontSize: 12, color: COLORS.muted, marginTop: 2 },

    // FAQ
    faqCard: {
        backgroundColor: COLORS.card,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: "hidden",
    },
    faqItem: { padding: 16 },
    faqBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
    faqQ: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginBottom: 6 },
    faqQTxt: { fontSize: 14, fontWeight: "700", color: COLORS.text, flex: 1, lineHeight: 20 },
    faqA: { fontSize: 13, color: COLORS.muted, lineHeight: 19, paddingLeft: 24 },
});
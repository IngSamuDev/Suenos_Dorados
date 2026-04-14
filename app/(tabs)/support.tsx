import { Feather } from "@expo/vector-icons";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppHeader from "../../components/header/AppHeader";
import { CONTACT_OPTIONS, FAQS } from "../../constants/support";
import { COLORS, RADIUS } from "../../constants/theme";

function ContactCard({ item }: { item: typeof CONTACT_OPTIONS[0] }) {
    const handlePress = () => {
        if (item.url) Linking.openURL(item.url);
    };

    return (
        <TouchableOpacity style={s.contactCard} onPress={handlePress} activeOpacity={0.7}>
            <View style={s.contactIcon}>
                <Feather name={item.icon} size={20} color={COLORS.orange} />
            </View>
            <View style={s.contactInfo}>
                <Text style={s.contactTitle}>{item.title}</Text>
                <Text style={s.contactSub}>{item.subtitle}</Text>
            </View>
            <Feather name="chevron-right" size={16} color={COLORS.mutedDark} />
        </TouchableOpacity>
    );
}

function FaqCard({ item }: { item: typeof FAQS[0] }) {
    return (
        <View style={s.faqCard}>
            <View style={s.faqQuestion}>
                <Feather name="help-circle" size={16} color={COLORS.orange} />
                <Text style={s.faqQuestionTxt}>{item.question}</Text>
            </View>
            <Text style={s.faqAnswer}>{item.answer}</Text>
        </View>
    );
}

export default function Support() {
    return (
        <View style={s.root}>
            <AppHeader showSearch={false} title="Ayuda y soporte" />
            <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

                {/* Contacto */}
                <Text style={s.sectionTitle}>Contactanos</Text>
                <View style={s.contactList}>
                    {CONTACT_OPTIONS.map((item, i) => (
                        <View key={item.id}>
                            <ContactCard item={item} />
                            {i < CONTACT_OPTIONS.length - 1 && <View style={s.divider} />}
                        </View>
                    ))}
                </View>

                {/* FAQ */}
                <Text style={s.sectionTitle}>Preguntas frecuentes</Text>
                <View style={s.faqList}>
                    {FAQS.map((item, i) => (
                        <View key={item.id}>
                            <FaqCard item={item} />
                            {i < FAQS.length - 1 && <View style={s.divider} />}
                        </View>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: COLORS.bg },
    scroll: { padding: 16, paddingBottom: 100, gap: 12 },
    sectionTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: COLORS.text,
        marginBottom: 4,
        marginTop: 8,
    },
    contactList: {
        backgroundColor: COLORS.card,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: "hidden",
    },
    contactCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        padding: 16,
    },
    contactIcon: {
        width: 44,
        height: 44,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.amber,
        borderWidth: 1,
        borderColor: COLORS.amberBorder,
        alignItems: "center",
        justifyContent: "center",
    },
    contactInfo: { flex: 1 },
    contactTitle: { fontSize: 14, fontWeight: "700", color: COLORS.text },
    contactSub: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
    faqList: {
        backgroundColor: COLORS.card,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: "hidden",
    },
    faqCard: { padding: 16, gap: 8 },
    faqQuestion: { flexDirection: "row", alignItems: "center", gap: 8 },
    faqQuestionTxt: { fontSize: 14, fontWeight: "700", color: COLORS.text, flex: 1 },
    faqAnswer: { fontSize: 13, color: COLORS.muted, lineHeight: 19, paddingLeft: 24 },
    divider: { height: 1, backgroundColor: COLORS.border, marginHorizontal: 16 },
});
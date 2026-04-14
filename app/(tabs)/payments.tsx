import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import EmptyState from "../../components/ui/EmptyState";
import { useToast } from "../../components/ui/Toast";
import { COLORS } from "../../constants/theme";
import { PaymentMethod, useOrders } from "../../context/OrdersContext";

type PayType = "tarjeta" | "pse" | "efectivo";

const PAY_TYPES: { type: PayType; label: string; icon: React.ComponentProps<typeof Feather>["name"] }[] = [
    { type: "tarjeta", label: "Tarjeta", icon: "credit-card" },
    { type: "pse", label: "PSE", icon: "globe" },
    { type: "efectivo", label: "Efectivo", icon: "dollar-sign" },
];

const EMPTY_FORM = { type: "tarjeta" as PayType, label: "", details: "", isDefault: false };

export default function Payments() {
    const router = useRouter();
    const { payments, addPayment, updatePayment, deletePayment } = useOrders();
    const { showToast } = useToast();

    const [modalVisible, setModalVisible] = useState(false);
    const [editing, setEditing] = useState<PaymentMethod | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);

    const openNew = () => {
        setEditing(null);
        setForm(EMPTY_FORM);
        setModalVisible(true);
    };

    const openEdit = (p: PaymentMethod) => {
        setEditing(p);
        setForm({ type: p.type, label: p.label, details: p.details, isDefault: p.isDefault });
        setModalVisible(true);
    };

    const handleSave = async () => {
        if (!form.label.trim()) {
            showToast("Ingresá un nombre para este método", "error");
            return;
        }
        if (editing) {
            await updatePayment({ ...form, id: editing.id });
            showToast("Método de pago actualizado ✅");
        } else {
            await addPayment(form);
            showToast("Método de pago guardado ✅");
        }
        setModalVisible(false);
    };

    const handleDelete = async (id: string) => {
        await deletePayment(id);
        showToast("Método eliminado", "info");
    };

    const payIcon = (type: PayType) =>
        PAY_TYPES.find((t) => t.type === type)?.icon ?? "credit-card";

    return (
        <View style={s.root}>
            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
                    <Feather name="arrow-left" size={20} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={s.title}>Métodos de pago</Text>
                <TouchableOpacity style={s.addBtn} onPress={openNew}>
                    <Feather name="plus" size={20} color={COLORS.orange} />
                </TouchableOpacity>
            </View>

            {payments.length === 0 ? (
                <EmptyState
                    icon="credit-card"
                    title="Sin métodos de pago"
                    subtitle="Agregá una tarjeta u otro método para pagar más rápido"
                    actionLabel="Agregar método"
                    onAction={openNew}
                />
            ) : (
                <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }} showsVerticalScrollIndicator={false}>
                    {payments.map((p) => (
                        <View key={p.id} style={s.card}>
                            <View style={s.cardLeft}>
                                <View style={[s.iconBox, p.type === "efectivo" && s.iconBoxGreen, p.type === "pse" && s.iconBoxBlue]}>
                                    <Feather name={payIcon(p.type)} size={18} color={
                                        p.type === "efectivo" ? COLORS.green : p.type === "pse" ? COLORS.blue : COLORS.orange
                                    } />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={s.labelRow}>
                                        <Text style={s.payLabel}>{p.label}</Text>
                                        {p.isDefault && (
                                            <View style={s.defaultBadge}>
                                                <Text style={s.defaultTxt}>Principal</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text style={s.payType}>{PAY_TYPES.find((t) => t.type === p.type)?.label}</Text>
                                    {p.details ? <Text style={s.payDetails}>{p.details}</Text> : null}
                                </View>
                            </View>
                            <View style={s.actions}>
                                <TouchableOpacity style={s.actionBtn} onPress={() => openEdit(p)}>
                                    <Feather name="edit-2" size={15} color={COLORS.orange} />
                                </TouchableOpacity>
                                <TouchableOpacity style={[s.actionBtn, s.actionBtnDanger]} onPress={() => handleDelete(p.id)}>
                                    <Feather name="trash-2" size={15} color={COLORS.red} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )}

            {/* ── Modal formulario ─────────────────────────── */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    style={s.modalOverlay}
                >
                    <View style={s.modalSheet}>
                        <View style={s.modalHandle} />
                        <View style={s.modalHeader}>
                            <Text style={s.modalTitle}>
                                {editing ? "Editar método" : "Nuevo método de pago"}
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Feather name="x" size={22} color={COLORS.muted} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Tipo de pago */}
                            <Text style={s.fieldLabel}>Tipo de método *</Text>
                            <View style={s.typeRow}>
                                {PAY_TYPES.map((t) => (
                                    <TouchableOpacity
                                        key={t.type}
                                        style={[s.typeChip, form.type === t.type && s.typeChipActive]}
                                        onPress={() => setForm((f) => ({ ...f, type: t.type }))}
                                    >
                                        <Feather
                                            name={t.icon}
                                            size={16}
                                            color={form.type === t.type ? COLORS.orange : COLORS.muted}
                                        />
                                        <Text style={[s.typeTxt, form.type === t.type && s.typeTxtActive]}>
                                            {t.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Nombre / alias */}
                            <View style={s.fieldWrap}>
                                <Text style={s.fieldLabel}>
                                    {form.type === "tarjeta" ? "Nombre en la tarjeta *" : "Nombre / alias *"}
                                </Text>
                                <TextInput
                                    style={s.input}
                                    placeholder={
                                        form.type === "tarjeta"
                                            ? "Visa ****1234"
                                            : form.type === "pse"
                                                ? "Bancolombia PSE"
                                                : "Efectivo en casa"
                                    }
                                    placeholderTextColor={COLORS.mutedDark}
                                    value={form.label}
                                    onChangeText={(t) => setForm((f) => ({ ...f, label: t }))}
                                />
                            </View>

                            {/* Detalles adicionales */}
                            <View style={s.fieldWrap}>
                                <Text style={s.fieldLabel}>Detalles adicionales</Text>
                                <TextInput
                                    style={s.input}
                                    placeholder={
                                        form.type === "tarjeta"
                                            ? "Titular: Juan García"
                                            : form.type === "pse"
                                                ? "NIT o cédula"
                                                : "Notas adicionales"
                                    }
                                    placeholderTextColor={COLORS.mutedDark}
                                    value={form.details}
                                    onChangeText={(t) => setForm((f) => ({ ...f, details: t }))}
                                />
                            </View>

                            {/* Toggle principal */}
                            <TouchableOpacity
                                style={s.toggle}
                                onPress={() => setForm((f) => ({ ...f, isDefault: !f.isDefault }))}
                            >
                                <View style={[s.toggleBox, form.isDefault && s.toggleBoxActive]}>
                                    {form.isDefault && <Feather name="check" size={12} color="#fff" />}
                                </View>
                                <Text style={s.toggleTxt}>Establecer como método principal</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={s.saveBtn} onPress={handleSave} activeOpacity={0.85}>
                                <Text style={s.saveBtnTxt}>{editing ? "Guardar cambios" : "Agregar método"}</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
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
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
    },
    title: { fontSize: 17, fontWeight: "800", color: COLORS.text },
    addBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.amber,
        borderWidth: 1,
        borderColor: COLORS.amberBorder,
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 16,
        flexDirection: "row",
        gap: 12,
        alignItems: "flex-start",
    },
    cardLeft: { flex: 1, flexDirection: "row", gap: 12 },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.amber,
        alignItems: "center",
        justifyContent: "center",
    },
    iconBoxGreen: { backgroundColor: "#dcfce7" },
    iconBoxBlue: { backgroundColor: "#dbeafe" },
    labelRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 2 },
    payLabel: { fontSize: 14, fontWeight: "800", color: COLORS.text },
    defaultBadge: {
        backgroundColor: COLORS.orange + "20",
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 6,
    },
    defaultTxt: { fontSize: 10, fontWeight: "700", color: COLORS.orange },
    payType: { fontSize: 12, color: COLORS.muted, marginBottom: 2 },
    payDetails: { fontSize: 12, color: COLORS.text },
    actions: { gap: 8 },
    actionBtn: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: COLORS.amber,
        alignItems: "center",
        justifyContent: "center",
    },
    actionBtnDanger: { backgroundColor: "#fff0f0" },
    // Modal
    modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" },
    modalSheet: {
        backgroundColor: COLORS.card,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
        maxHeight: "90%",
    },
    modalHandle: {
        width: 40,
        height: 4,
        backgroundColor: COLORS.border,
        borderRadius: 2,
        alignSelf: "center",
        marginBottom: 20,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    modalTitle: { fontSize: 18, fontWeight: "800", color: COLORS.text },
    typeRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
    typeChip: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: COLORS.bg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    typeChipActive: { backgroundColor: COLORS.amber, borderColor: COLORS.amberBorder },
    typeTxt: { fontSize: 12, fontWeight: "600", color: COLORS.muted },
    typeTxtActive: { color: COLORS.amberAccent, fontWeight: "700" },
    fieldWrap: { marginBottom: 14 },
    fieldLabel: { fontSize: 12, fontWeight: "700", color: COLORS.text, marginBottom: 6 },
    input: {
        backgroundColor: COLORS.bg,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        color: COLORS.text,
    },
    toggle: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 20 },
    toggleBox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
    },
    toggleBoxActive: { backgroundColor: COLORS.orange, borderColor: COLORS.orange },
    toggleTxt: { fontSize: 13, color: COLORS.text, fontWeight: "500" },
    saveBtn: {
        backgroundColor: COLORS.orange,
        borderRadius: 14,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
    },
    saveBtnTxt: { color: "#fff", fontSize: 15, fontWeight: "800" },
});
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
import { Address, useOrders } from "../../context/OrdersContext";

// ─── Formulario vacío ─────────────────────────────────────────────────────────
const EMPTY_FORM = { label: "", fullAddress: "", city: "", phone: "", isDefault: false };

export default function Addresses() {
    const router = useRouter();
    const { addresses, addAddress, updateAddress, deleteAddress } = useOrders();
    const { showToast } = useToast();

    const [modalVisible, setModalVisible] = useState(false);
    const [editing, setEditing] = useState<Address | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);

    const openNew = () => {
        setEditing(null);
        setForm(EMPTY_FORM);
        setModalVisible(true);
    };

    const openEdit = (addr: Address) => {
        setEditing(addr);
        setForm({
            label: addr.label,
            fullAddress: addr.fullAddress,
            city: addr.city,
            phone: addr.phone,
            isDefault: addr.isDefault,
        });
        setModalVisible(true);
    };

    const handleSave = async () => {
        if (!form.label.trim() || !form.fullAddress.trim() || !form.city.trim()) {
            showToast("Completá los campos obligatorios", "error");
            return;
        }
        if (editing) {
            await updateAddress({ ...form, id: editing.id });
            showToast("Dirección actualizada ✅");
        } else {
            await addAddress(form);
            showToast("Dirección guardada ✅");
        }
        setModalVisible(false);
    };

    const handleDelete = async (id: string) => {
        await deleteAddress(id);
        showToast("Dirección eliminada", "info");
    };

    return (
        <View style={s.root}>
            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
                    <Feather name="arrow-left" size={20} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={s.title}>Mis direcciones</Text>
                <TouchableOpacity style={s.addBtn} onPress={openNew}>
                    <Feather name="plus" size={20} color={COLORS.orange} />
                </TouchableOpacity>
            </View>

            {addresses.length === 0 ? (
                <EmptyState
                    icon="map-pin"
                    title="Sin direcciones"
                    subtitle="Agregá una dirección de envío para agilizar tus compras"
                    actionLabel="Agregar dirección"
                    onAction={openNew}
                />
            ) : (
                <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }} showsVerticalScrollIndicator={false}>
                    {addresses.map((addr) => (
                        <View key={addr.id} style={s.card}>
                            <View style={s.cardLeft}>
                                <View style={s.iconBox}>
                                    <Feather name="map-pin" size={18} color={COLORS.orange} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={s.labelRow}>
                                        <Text style={s.addrLabel}>{addr.label}</Text>
                                        {addr.isDefault && (
                                            <View style={s.defaultBadge}>
                                                <Text style={s.defaultTxt}>Principal</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text style={s.addrFull}>{addr.fullAddress}</Text>
                                    <Text style={s.addrCity}>{addr.city}</Text>
                                    {addr.phone ? <Text style={s.addrPhone}>📞 {addr.phone}</Text> : null}
                                </View>
                            </View>
                            <View style={s.actions}>
                                <TouchableOpacity style={s.actionBtn} onPress={() => openEdit(addr)}>
                                    <Feather name="edit-2" size={15} color={COLORS.orange} />
                                </TouchableOpacity>
                                <TouchableOpacity style={[s.actionBtn, s.actionBtnDanger]} onPress={() => handleDelete(addr.id)}>
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
                                {editing ? "Editar dirección" : "Nueva dirección"}
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Feather name="x" size={22} color={COLORS.muted} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Field
                                label="Etiqueta *"
                                placeholder="Ej: Casa, Oficina, Casa de mamá"
                                value={form.label}
                                onChangeText={(t) => setForm((f) => ({ ...f, label: t }))}
                            />
                            <Field
                                label="Dirección completa *"
                                placeholder="Calle 123 # 45-67, Apto 8"
                                value={form.fullAddress}
                                onChangeText={(t) => setForm((f) => ({ ...f, fullAddress: t }))}
                                multiline
                            />
                            <Field
                                label="Ciudad *"
                                placeholder="Bogotá, Medellín..."
                                value={form.city}
                                onChangeText={(t) => setForm((f) => ({ ...f, city: t }))}
                            />
                            <Field
                                label="Teléfono de contacto"
                                placeholder="+57 300 000 0000"
                                value={form.phone}
                                onChangeText={(t) => setForm((f) => ({ ...f, phone: t }))}
                                keyboardType="phone-pad"
                            />

                            {/* Toggle principal */}
                            <TouchableOpacity
                                style={s.toggle}
                                onPress={() => setForm((f) => ({ ...f, isDefault: !f.isDefault }))}
                            >
                                <View style={[s.toggleBox, form.isDefault && s.toggleBoxActive]}>
                                    {form.isDefault && <Feather name="check" size={12} color="#fff" />}
                                </View>
                                <Text style={s.toggleTxt}>Establecer como dirección principal</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={s.saveBtn} onPress={handleSave} activeOpacity={0.85}>
                                <Text style={s.saveBtnTxt}>{editing ? "Guardar cambios" : "Agregar dirección"}</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}

// ─── Campo reutilizable ───────────────────────────────────────────────────────
function Field({
    label,
    placeholder,
    value,
    onChangeText,
    multiline,
    keyboardType,
}: {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (t: string) => void;
    multiline?: boolean;
    keyboardType?: any;
}) {
    return (
        <View style={sf.wrap}>
            <Text style={sf.label}>{label}</Text>
            <TextInput
                style={[sf.input, multiline && { height: 72, textAlignVertical: "top" }]}
                placeholder={placeholder}
                placeholderTextColor={COLORS.mutedDark}
                value={value}
                onChangeText={onChangeText}
                multiline={multiline}
                keyboardType={keyboardType ?? "default"}
            />
        </View>
    );
}

const sf = StyleSheet.create({
    wrap: { marginBottom: 14 },
    label: { fontSize: 12, fontWeight: "700", color: COLORS.text, marginBottom: 6 },
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
});

// ─── Styles ───────────────────────────────────────────────────────────────────
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
    labelRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
    addrLabel: { fontSize: 14, fontWeight: "800", color: COLORS.text },
    defaultBadge: {
        backgroundColor: COLORS.orange + "20",
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 6,
    },
    defaultTxt: { fontSize: 10, fontWeight: "700", color: COLORS.orange },
    addrFull: { fontSize: 13, color: COLORS.text, lineHeight: 18 },
    addrCity: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
    addrPhone: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
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
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
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
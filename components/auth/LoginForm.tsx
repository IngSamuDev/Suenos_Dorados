import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BG = "#fffdf9";
const ORANGE = "#f5a742";
const MUTED = "#c0b4a4";
const BORDER = "#ede8e0";
const AMBER = "#fff3dc";
const TEXT = "#2d2520";
const WHITE = "#ffffff";
const DANGER = "#ef4444";

type FormData = { email: string; password: string };
type Errors = Partial<Record<keyof FormData, string>>;

const validate = (data: FormData): Errors => {
    const errors: Errors = {};
    if (!data.email.trim()) errors.email = "Ingresá tu correo";
    if (!data.password.trim()) errors.password = "Ingresá tu contraseña";
    return errors;
};

export default function LoginForm() {
    const router = useRouter();
    const [form, setForm] = useState<FormData>({ email: "", password: "" });
    const [errors, setErrors] = useState<Errors>({});
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [remember, setRemember] = useState(false);

    const handleChange = (key: keyof FormData, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

    const handleSubmit = async () => {
        const validationErrors = validate(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000));
        setLoading(false);
        router.replace("/(tabs)/(stacks)/" as any);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
            <StatusBar barStyle="light-content" backgroundColor={ORANGE} />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

                    {/* Header */}
                    <View style={{ backgroundColor: ORANGE, paddingTop: 28, paddingBottom: 28, paddingHorizontal: 20, borderBottomRightRadius: 28, borderBottomLeftRadius: 28 }}>
                        <View style={{ alignItems: "center" }}>
                            <View style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: AMBER, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.4)", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                                <Feather name="moon" size={24} color={ORANGE} />
                            </View>
                            <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 10, letterSpacing: 3, fontWeight: "700" }}>SUEÑOS DORADOS</Text>
                            <Text style={{ color: WHITE, fontSize: 22, fontWeight: "800", marginTop: 6 }}>Bienvenido de nuevo</Text>
                            <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 3 }}>Iniciá sesión para continuar</Text>
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 20, paddingTop: 28, gap: 16 }}>

                        {/* Email */}
                        <View>
                            <Text style={{ color: TEXT, fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Correo electrónico</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: WHITE, borderWidth: 1.5, borderColor: errors.email ? DANGER : BORDER, borderRadius: 14, paddingHorizontal: 14 }}>
                                <Feather name="mail" size={16} color={MUTED} style={{ marginRight: 10 }} />
                                <TextInput style={{ flex: 1, height: 48, fontSize: 15, color: TEXT }} placeholder="tu@correo.com" placeholderTextColor={MUTED} value={form.email} onChangeText={(v) => handleChange("email", v)} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
                            </View>
                            {errors.email && <Text style={{ color: DANGER, fontSize: 12, marginTop: 4, marginLeft: 4 }}>{errors.email}</Text>}
                        </View>

                        {/* Contraseña */}
                        <View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                                <Text style={{ color: TEXT, fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase" }}>Contraseña</Text>
                                <TouchableOpacity><Text style={{ color: ORANGE, fontSize: 12, fontWeight: "700" }}>¿Olvidaste tu contraseña?</Text></TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: WHITE, borderWidth: 1.5, borderColor: errors.password ? DANGER : BORDER, borderRadius: 14, paddingHorizontal: 14 }}>
                                <Feather name="lock" size={16} color={MUTED} style={{ marginRight: 10 }} />
                                <TextInput style={{ flex: 1, height: 48, fontSize: 15, color: TEXT }} placeholder="Tu contraseña" placeholderTextColor={MUTED} value={form.password} onChangeText={(v) => handleChange("password", v)} secureTextEntry={!showPass} autoCapitalize="none" autoCorrect={false} />
                                <TouchableOpacity onPress={() => setShowPass((v) => !v)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                                    <Feather name={showPass ? "eye" : "eye-off"} size={18} color={MUTED} />
                                </TouchableOpacity>
                            </View>
                            {errors.password && <Text style={{ color: DANGER, fontSize: 12, marginTop: 4, marginLeft: 4 }}>{errors.password}</Text>}
                        </View>

                        {/* Recordarme */}
                        <TouchableOpacity onPress={() => setRemember((v) => !v)} activeOpacity={0.7} style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <View style={{ width: 20, height: 20, borderRadius: 6, borderWidth: 2, borderColor: remember ? ORANGE : MUTED, backgroundColor: remember ? ORANGE : WHITE, alignItems: "center", justifyContent: "center" }}>
                                {remember && <Feather name="check" size={12} color={WHITE} />}
                            </View>
                            <Text style={{ color: MUTED, fontSize: 13 }}>Recordar mi sesión</Text>
                        </TouchableOpacity>

                        {/* Botón */}
                        <TouchableOpacity onPress={handleSubmit} disabled={loading} activeOpacity={0.85} style={{ height: 52, borderRadius: 16, marginTop: 4, backgroundColor: loading ? "#e09030" : ORANGE, alignItems: "center", justifyContent: "center", elevation: 6 }}>
                            {loading ? <ActivityIndicator color={WHITE} /> : <Text style={{ color: WHITE, fontSize: 16, fontWeight: "800", letterSpacing: 0.5 }}>Iniciar sesión</Text>}
                        </TouchableOpacity>

                        {/* Divider */}
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: BORDER }} />
                            <Text style={{ color: MUTED, fontSize: 12 }}>o ingresá con</Text>
                            <View style={{ flex: 1, height: 1, backgroundColor: BORDER }} />
                        </View>

                        {/* Social */}
                        <View style={{ flexDirection: "row", gap: 12 }}>
                            {[{ label: "Google", icon: "chrome" as const }, { label: "Facebook", icon: "facebook" as const }].map((s) => (
                                <TouchableOpacity key={s.label} activeOpacity={0.75} style={{ flex: 1, height: 48, borderRadius: 14, backgroundColor: AMBER, borderWidth: 1.5, borderColor: BORDER, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                    <Feather name={s.icon} size={18} color={TEXT} />
                                    <Text style={{ color: TEXT, fontSize: 14, fontWeight: "600" }}>{s.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Ir a registro */}
                        <TouchableOpacity onPress={() => router.replace("/(tabs)/register" as any)} style={{ alignItems: "center", paddingVertical: 8 }}>
                            <Text style={{ color: MUTED, fontSize: 14 }}>¿No tenés cuenta?{" "}<Text style={{ color: ORANGE, fontWeight: "800" }}>Registrate</Text></Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
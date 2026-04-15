import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
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

type FormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};
type Errors = Partial<Record<keyof FormData, string>>;

const validate = (data: FormData): Errors => {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = "El nombre es obligatorio";
  if (!data.email.trim()) errors.email = "El correo es obligatorio";
  if (!data.phone.trim()) errors.phone = "El teléfono es obligatorio";
  if (!data.password.trim()) errors.password = "La contraseña es obligatoria";
  if (!data.confirmPassword.trim())
    errors.confirmPassword = "Confirmá tu contraseña";
  if (
    data.password.trim() &&
    data.confirmPassword.trim() &&
    data.password !== data.confirmPassword
  )
    errors.confirmPassword = "Las contraseñas no coinciden";
  return errors;
};

type FieldConfig = {
  key: keyof FormData;
  label: string;
  placeholder: string;
  keyboard?: "default" | "email-address" | "phone-pad";
  secure?: boolean;
  capitalize?: "none" | "words";
};

const FIELDS: FieldConfig[] = [
  {
    key: "name",
    label: "Nombre completo",
    placeholder: "",
    capitalize: "words",
  },
  {
    key: "email",
    label: "Correo electrónico",
    placeholder: "",
    keyboard: "email-address",
    capitalize: "none",
  },
  {
    key: "phone",
    label: "Teléfono",
    placeholder: "+57 300 000 0000",
    keyboard: "phone-pad",
  },
  {
    key: "password",
    label: "Contraseña",
    placeholder: "Mínimo 8 caracteres",
    secure: true,
    capitalize: "none",
  },
  {
    key: "confirmPassword",
    label: "Confirmar contraseña",
    placeholder: "Repite tu contraseña",
    secure: true,
    capitalize: "none",
  },
];

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showFields, setShowFields] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  useFocusEffect(
    useCallback(() => {
      // Esta parte se ejecuta cuando SALES de la pantalla
      return () => {
        setForm({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
        setAccepted(false);
        setLoading(false);
      };
    }, []),
  );

  const handleChange = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleShow = (key: string) =>
    setShowFields((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSubmit = async () => {
    const validationErrors = validate(form);
    if (!accepted)
      validationErrors.name =
        validationErrors.name ?? "Acepta los términos para continuar";
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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View
            style={{
              backgroundColor: ORANGE,
              paddingTop: 28,
              paddingBottom: 24,
              paddingHorizontal: 20,
              borderBottomRightRadius: 28,
              borderBottomLeftRadius: 28,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  backgroundColor: AMBER,
                  borderWidth: 1.5,
                  borderColor: "rgba(255,255,255,0.4)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                <Feather name="moon" size={24} color={ORANGE} />
              </View>
              <Text
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: 10,
                  letterSpacing: 3,
                  fontWeight: "700",
                }}
              >
                SUEÑOS DORADOS
              </Text>
              <Text
                style={{
                  color: WHITE,
                  fontSize: 22,
                  fontWeight: "800",
                  marginTop: 6,
                }}
              >
                Crea tu cuenta
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 13,
                  marginTop: 3,
                }}
              >
                Descubre el descanso perfecto
              </Text>
            </View>
          </View>

          <View style={{ paddingHorizontal: 20, paddingTop: 24, gap: 14 }}>
            {FIELDS.map((field) => (
              <View key={field.key}>
                <Text
                  style={{
                    color: TEXT,
                    fontSize: 11,
                    fontWeight: "700",
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  {field.label}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: WHITE,
                    borderWidth: 1.5,
                    borderColor: errors[field.key] ? DANGER : BORDER,
                    borderRadius: 14,
                    paddingHorizontal: 14,
                  }}
                >
                  <TextInput
                    style={{ flex: 1, height: 48, fontSize: 15, color: TEXT }}
                    placeholder={field.placeholder}
                    placeholderTextColor={MUTED}
                    value={form[field.key]}
                    onChangeText={(v) => handleChange(field.key, v)}
                    secureTextEntry={field.secure && !showFields[field.key]}
                    keyboardType={field.keyboard ?? "default"}
                    autoCapitalize={field.capitalize ?? "none"}
                    autoCorrect={false}
                  />
                  {field.secure && (
                    <TouchableOpacity
                      onPress={() => toggleShow(field.key)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Feather
                        name={showFields[field.key] ? "eye" : "eye-off"}
                        size={18}
                        color={MUTED}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {errors[field.key] && (
                  <Text
                    style={{
                      color: DANGER,
                      fontSize: 12,
                      marginTop: 4,
                      marginLeft: 4,
                    }}
                  >
                    {errors[field.key]}
                  </Text>
                )}
              </View>
            ))}

            {/* Términos */}
            <TouchableOpacity
              onPress={() => setAccepted((v) => !v)}
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 10,
                marginTop: 2,
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  marginTop: 1,
                  borderWidth: 2,
                  borderColor: accepted ? ORANGE : MUTED,
                  backgroundColor: accepted ? ORANGE : WHITE,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {accepted && <Feather name="check" size={12} color={WHITE} />}
              </View>
              <Text
                style={{ flex: 1, color: MUTED, fontSize: 13, lineHeight: 20 }}
              >
                Acepto los{" "}
                <Text style={{ color: ORANGE, fontWeight: "700" }}>
                  Términos de uso
                </Text>{" "}
                y la{" "}
                <Text style={{ color: ORANGE, fontWeight: "700" }}>
                  Política de privacidad
                </Text>
              </Text>
            </TouchableOpacity>

            {/* Botón */}
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.85}
              style={{
                height: 52,
                borderRadius: 16,
                marginTop: 4,
                backgroundColor: loading ? "#e09030" : ORANGE,
                alignItems: "center",
                justifyContent: "center",
                elevation: 6,
              }}
            >
              {loading ? (
                <ActivityIndicator color={WHITE} />
              ) : (
                <Text
                  style={{
                    color: WHITE,
                    fontSize: 16,
                    fontWeight: "800",
                    letterSpacing: 0.5,
                  }}
                >
                  Crear cuenta
                </Text>
              )}
            </TouchableOpacity>

            {/* Ir a login */}
            <TouchableOpacity
              onPress={() => router.replace("/(tabs)/login" as any)}
              style={{ alignItems: "center", paddingVertical: 8 }}
            >
              <Text style={{ color: MUTED, fontSize: 14 }}>
                ¿Ya tienes cuenta?{" "}
                <Text style={{ color: ORANGE, fontWeight: "800" }}>
                  Inicia sesión
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

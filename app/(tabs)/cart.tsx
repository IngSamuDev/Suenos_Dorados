import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppHeader from "../../components/header/AppHeader";

export default function Cart() {
    return (
        <View style={s.root}>
            <AppHeader showSearch={false} title="Mi carrito" />
            <View style={s.center}>
                <View style={s.iconWrap}>
                    <Feather name="shopping-cart" size={32} color="#f5a742" />
                </View>
                <Text style={s.title}>Tu carrito está vacío</Text>
                <Text style={s.sub}>Agregá productos desde el catálogo para verlos acá</Text>
                <TouchableOpacity style={s.btn}>
                    <Feather name="arrow-left" size={14} color="#fff" />
                    <Text style={s.btnTxt}>Ir a comprar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: "#fffdf9" },
    center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, paddingHorizontal: 40 },
    iconWrap: {
        width: 72, height: 72, borderRadius: 20,
        backgroundColor: "#fff3dc",
        alignItems: "center", justifyContent: "center",
        borderWidth: 1, borderColor: "#f5e0b0",
        marginBottom: 4,
    },
    title: { fontSize: 18, fontWeight: "800", color: "#2d2520" },
    sub: { fontSize: 13, color: "#b0a090", textAlign: "center", lineHeight: 20 },
    btn: {
        flexDirection: "row", alignItems: "center", gap: 6,
        marginTop: 8,
        backgroundColor: "#f5a742",
        paddingHorizontal: 20, paddingVertical: 12,
        borderRadius: 12,
    },
    btnTxt: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
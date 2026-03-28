import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import AppHeader from "../../components/header/AppHeader";

export default function Explore() {
  return (
    <View style={s.root}>
      <AppHeader showSearch={true} title="Explorar" />
      <View style={s.center}>
        <View style={s.iconWrap}>
          <Feather name="search" size={32} color="#f5a742" />
        </View>
        <Text style={s.title}>Explorá el catálogo</Text>
        <Text style={s.sub}>Acá irá el catálogo completo de productos</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fffdf9" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  iconWrap: {
    width: 72, height: 72, borderRadius: 20,
    backgroundColor: "#fff3dc",
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: "#f5e0b0",
  },
  title: { fontSize: 18, fontWeight: "800", color: "#2d2520" },
  sub: { fontSize: 13, color: "#b0a090", textAlign: "center", paddingHorizontal: 40 },
});
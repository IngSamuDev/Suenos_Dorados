import { Tabs } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const BG = "#fffdf9";
const ORANGE = "#f5a742";
const MUTED = "#c0b4a4";
const BORDER = "#ede8e0";
const AMBER = "#fff3dc";

function TabIcon({
  icon,
  label,
  focused,
}: {
  icon: React.ComponentProps<typeof Feather>["name"];
  label: string;
  focused: boolean;
}) {
  return (
    <View style={[t.wrap, focused && t.wrapActive]}>
      <Feather name={icon} size={20} color={focused ? ORANGE : MUTED} />
      <Text style={[t.label, focused && t.labelActive]}>{label}</Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: t.bar,
        tabBarShowLabel: false,
      }}
    >
      {/* ── Tabs visibles ── */}
      <Tabs.Screen
        name="(stacks)"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="home" label="Inicio" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="search" label="Explorar" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="shopping-cart" label="Carrito" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="heart" label="Favoritos" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="user" label="Perfil" focused={focused} />
          ),
        }}
      />

      {/* ── Rutas ocultas del tab bar ── */}
      <Tabs.Screen
        name="index"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="login"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}

const t = StyleSheet.create({
  bar: {
    backgroundColor: BG,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    height: 72,
    paddingBottom: 0,
    paddingTop: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  wrap: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 56,
  },
  wrapActive: { backgroundColor: AMBER },
  label: { fontSize: 10, fontWeight: "500", color: MUTED },
  labelActive: { color: ORANGE, fontWeight: "700" },
});
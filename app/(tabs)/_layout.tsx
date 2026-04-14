import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useCart } from "../../context/CartContext";

const BG = "#fffdf9";
const ORANGE = "#f5a742";
const MUTED = "#c0b4a4";
const BORDER = "#ede8e0";
const AMBER = "#fff3dc";

// ─── Ícono de tab con label ───────────────────────────────────────────────────
function TabIcon({
  icon,
  label,
  focused,
  badge,
}: {
  icon: React.ComponentProps<typeof Feather>["name"];
  label: string;
  focused: boolean;
  badge?: number;
}) {
  return (
    <View style={[t.wrap, focused && t.wrapActive]}>
      <View>
        <Feather name={icon} size={20} color={focused ? ORANGE : MUTED} />
        {badge != null && badge > 0 && (
          <View style={t.badge}>
            <Text style={t.badgeTxt}>{badge > 99 ? "99+" : badge}</Text>
          </View>
        )}
      </View>
      <Text style={[t.label, focused && t.labelActive]} numberOfLines={1} adjustsFontSizeToFit>
        {label}
      </Text>
    </View>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function TabsLayout() {
  const { count } = useCart();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: t.bar,
        tabBarShowLabel: false,
      }}
    >
      {/* Tabs visibles */}
      <Tabs.Screen
        name="(stacks)"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="home" label="Inicio" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="shopping-cart" label="Carrito" focused={focused} badge={count} />
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

      {/* Rutas ocultas del tab bar */}
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="orders" options={{ href: null }} />
      <Tabs.Screen name="addresses" options={{ href: null }} />
      <Tabs.Screen name="payments" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
      <Tabs.Screen name="support" options={{ href: null }} />
      <Tabs.Screen
        name="login"
        options={{ href: null, tabBarStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="register"
        options={{ href: null, tabBarStyle: { display: "none" } }}
      />
    </Tabs>
  );
}

const t = StyleSheet.create({
  bar: {
    backgroundColor: BG,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 0,
    shadowOpacity: 0,
  },
  wrap: {
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
    minWidth: 64,
  },
  wrapActive: { backgroundColor: AMBER },
  label: { fontSize: 10, fontWeight: "500", color: MUTED },
  labelActive: { color: ORANGE, fontWeight: "700" },
  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: ORANGE,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeTxt: { fontSize: 9, fontWeight: "800", color: "#fff" },
});
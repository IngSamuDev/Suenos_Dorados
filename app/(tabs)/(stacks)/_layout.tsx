import { Stack } from "expo-router";
import AppHeader from "../../../components/header/AppHeader";

export default function StackLayout() {
    return (
        <Stack
            screenOptions={{
                header: () => <AppHeader showSearch={true} />,
                contentStyle: { backgroundColor: "#fffdf9" },
                animation: "slide_from_right",
            }}
        >
            {/* Pantalla principal — Home */}
            <Stack.Screen
                name="index"
                options={{
                    header: () => <AppHeader showSearch={true} />,
                }}
            />

            {/* Detalle de producto */}
            <Stack.Screen
                name="product"
                options={{
                    header: () => <AppHeader showSearch={false} title="Detalle del producto" />,
                }}
            />

            {/* Carrito */}
            <Stack.Screen
                name="cart"
                options={{
                    header: () => <AppHeader showSearch={false} title="Mi carrito" />,
                }}
            />

            {/* Checkout */}
            <Stack.Screen
                name="checkout"
                options={{
                    header: () => <AppHeader showSearch={false} title="Finalizar compra" />,
                }}
            />

            {/* Pedido confirmado */}
            <Stack.Screen
                name="order-confirm"
                options={{
                    header: () => <AppHeader showSearch={false} title="¡Pedido realizado!" />,
                    gestureEnabled: false,
                }}
            />

            {/* Búsqueda */}
            <Stack.Screen
                name="search"
                options={{
                    header: () => <AppHeader showSearch={true} title="Buscar" />,
                    animation: "fade",
                }}
            />
        </Stack>
    );
}
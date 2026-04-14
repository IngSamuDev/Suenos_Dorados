import { ScrollView, View } from "react-native";
import { useState } from "react";
import { COLORS } from "../../../constants/theme";
import Hero from "../../../components/index/Hero";
import Stats from "../../../components/index/Stats";
import Categorias from "../../../components/index/Categorias";
import Featured from "../../../components/index/Featured";
import PromoBanner from "../../../components/index/PromoBanner";
import Recent from "../../../components/index/Recent";

const CAT_MAP: Record<string, string> = {
    "1": "Todo",
    "2": "Edredones",
    "3": "Cobijas",
    "4": "Almohadas",
    "5": "Accesorios",
};

export default function Home() {
    const [activeCat, setActiveCat] = useState("1");
    const categoryName = CAT_MAP[activeCat] ?? "Todo";

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <Hero />
                <Stats />
                <Categorias active={activeCat} onSelect={setActiveCat} />
                <Featured categoryFilter={categoryName} />
                <PromoBanner />
                <Recent categoryFilter={categoryName} />
            </ScrollView>
        </View>
    );
}
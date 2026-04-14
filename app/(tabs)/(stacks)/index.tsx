import { ScrollView, View } from "react-native";
import { useState } from "react";
import { COLORS } from "../../../constants/theme";
import Hero from "../../../components/index/Hero";
import Stats from "../../../components/index/Stats";
import Categorias from "../../../components/index/Categorias";
import Featured from "../../../components/index/Featured";
import PromoBanner from "../../../components/index/PromoBanner";
import Recent from "../../../components/index/Recent";

export default function Home() {
    const [activeCat, setActiveCat] = useState("1");

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <Hero />
                <Stats />
                <Categorias active={activeCat} onSelect={setActiveCat} />
                <Featured />
                <PromoBanner />
                <Recent />
            </ScrollView>
        </View>
    );
}
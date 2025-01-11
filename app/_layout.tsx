import { Stack } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { RuleProvider } from "../src/hooks/ruleProvider";
import DateProvider from "../src/hooks/dateProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <GluestackUIProvider mode="light">
      <DateProvider>
        <RuleProvider>
          <Stack>
            <Stack.Screen name="(rules)" options={{ headerShown: false }} />
          </Stack>
        </RuleProvider>
      </DateProvider>
    </GluestackUIProvider>
  );
}

import { useEffect } from "react";
import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import OneSignal, { NotificationReceivedEvent } from "react-native-onesignal";
import { ONESIGNAL_KEY } from "@env";

OneSignal.setAppId(ONESIGNAL_KEY);

OneSignal.promptForPushNotificationsWithUserResponse((response) => {
  console.log(response);
});

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";
import { tagUserInfoCreate } from "./src/notifications/notificationsTags";

import { CartContextProvider } from "./src/contexts/CartContext";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((response) => {
      const { actionId } = response.action as any;

      switch (actionId) {
        case "1":
          return console.log("Ver todas");
        case "2":
          return console.log("Ver pedido");
        default:
          return console.log("Nenhum botão clicado");
      }
    });

    return () => unsubscribe;
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}

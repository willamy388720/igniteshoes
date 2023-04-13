import { StatusBar } from "react-native";
import { useEffect } from "react";
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
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent: NotificationReceivedEvent) => {
        console.log(notificationReceivedEvent);
      }
    );

    return unsubscribe;
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

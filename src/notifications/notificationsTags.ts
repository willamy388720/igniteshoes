import OneSignal from "react-native-onesignal";

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    user_name: "Calvo Pony",
    user_email: "calvopony@gmail.com",
  });
}

export function tagCarUpdate(items_count: string) {
  OneSignal.sendTag("car_items_count", items_count);
}

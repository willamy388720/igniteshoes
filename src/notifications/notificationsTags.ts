import OneSignal from "react-native-onesignal";

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    user_name: "Calvo Pony",
    user_email: "calvopony@gmail.com",
  });
}

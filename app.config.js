import 'dotenv/config';
import { version } from './package.json'; // ดึงข้อมูล version จาก package.json

export default {
  expo: {
    name: "W Baby Bird",
    slug: "FlappyBird",
    owner: "kimsnow33",
    version,
    runtimeVersion: version,
    orientation: "portrait",
    icon: "./assets/LogoWBabyBird.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/Background/nigt.png",
      resizeMode: "cover",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.kimsnow33.FlappyBird",
      buildNumber: version,
      config: {
        googleSignIn: {
          reservedClientId: "948343640889-pvbiikavlnvqske0bk82em328f8b8to0.apps.googleusercontent.com"
        }
      },
      scheme: "w-baby-bird-scheme",
    },
    android: {
      versionCode: 2,
      adaptiveIcon: {
        foregroundImage: "./assets/LogoWBabyBird.png",
        backgroundColor: "#ffffff"
      },
      package: "com.kimsnow33.FlappyBird",
      googleServicesFile: "./android/app/google-services.json",
      permissions: [
        "RECEIVE_BOOT_COMPLETED",
        "VIBRATE",
        "WAKE_LOCK",
        "SYSTEM_ALERT_WINDOW",
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "ACCESS_WIFI_STATE",
        "NOTIFICATIONS"
      ],
      scheme: "w-baby-bird-scheme",
    },
    web: {
      favicon: "./assets/LogoWBabyBird.png"
    },
    notification: {
      icon: "./assets/LogoWBabyBird.png",
      color: "#ffffff",
      androidMode: "default",
      androidCollapsedTitle: "New Notification"
    },
    extra: {
      eas: {
        projectId: "33f0a9bc-ba74-4979-9de7-788147374794"
      },
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
    },
    plugins: [
      [
        "expo-notifications",
        {
          icon: "./assets/LogoWBabyBird.png",
          color: "#ffffff"
        }
      ]
    ],
    updates: {
      url: "https://u.expo.dev/33f0a9bc-ba74-4979-9de7-788147374794"
    },
  }
};

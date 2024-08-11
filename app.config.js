import 'dotenv/config';
import { version } from './package.json'; // ดึงข้อมูล version จาก package.json

export default {
  expo: {
    name: "W Baby Bird",
    slug: "FlappyBird",
    version, // ใช้ version จาก package.json
    orientation: "portrait",
    icon: "./assets/bridLogo.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/Background/tree_bg.png",
      resizeMode: "cover",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.kimsnow33.FlappyBird",
      buildNumber: version, // ใช้ version เป็น build number
      config: {
        googleSignIn: {
          reservedClientId: "948343640889-pvbiikavlnvqske0bk82em328f8b8to0.apps.googleusercontent.com"
        }
      },
      scheme: "w-baby-bird-scheme",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/bridLogo.png",
        backgroundColor: "#ffffff"
      },
      package: "com.kimsnow33.FlappyBird",
      googleServicesFile: "./android/app/google-services.json",
      versionCode: parseInt(version.replace(/\./g, '')), // แปลง version เป็นเลขจำนวนเต็มสำหรับ versionCode
      permissions: [
        "RECEIVE_BOOT_COMPLETED",
        "VIBRATE",
        "WAKE_LOCK",
        "SYSTEM_ALERT_WINDOW",
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "ACCESS_WIFI_STATE"
      ],
      scheme: "w-baby-bird-scheme",
    },
    web: {
      favicon: "./assets/bridLogo.png"
    },
    notification: {
      icon: "./assets/bridLogo.png",
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
          icon: "./assets/bridLogo.png",
          color: "#ffffff"
        }
      ]
    ],
    updates: {
      url: "https://u.expo.dev/33f0a9bc-ba74-4979-9de7-788147374794"
    },
    runtimeVersion: {
      policy: "nativeVersion" // ใช้ nativeVersion policy
    }
  }
};

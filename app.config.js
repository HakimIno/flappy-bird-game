import 'dotenv/config';

export default {
  expo: {
    name: "W Baby Bird",
    slug: "FlappyBird",
    version: "1.0.0",
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
      config: {
        googleSignIn: {
          reservedClientId: "948343640889-pvbiikavlnvqske0bk82em328f8b8to0.apps.googleusercontent.com"
        }
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/bridLogo.png",
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
        "ACCESS_WIFI_STATE"
      ]
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
    runtimeVersion: "1.0.0"
  }
};

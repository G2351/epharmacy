import "dotenv/config";

export default {
  expo: {
    name: "Epharmacy",
    slug: "Epharmacy",
    jsEngine: "hermes",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.yourname.epharmacy",
    },
    cli: {
      appVersionSource: "project", // Specify the version source
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiUrl: process.env.API_URL,
      apiUrlPayment: process.env.API_URL_PAYMENT,
      publicKey: process.env.PUBLIC_KEY,
      googleKey: process.env.GOOGLE_KEY,
      mapboxKey: process.env.MAPBOX_KEY,
      eas: {
        projectId: "36b97486-5f93-4511-9b74-6dccfc139211",
      },
    },
  },
};

// Alternative JavaScript config example
module.exports = {
  expo: {
    name: "Incall Manager Example",
    slug: "incall-manager-example", 
    version: "1.0.0",
    orientation: "portrait",
    platforms: ["ios", "android"],
    plugins: [
      // Using the config plugin
      "expo-config-plugin-incall-manager",
      
      // You can also configure it with options if needed in future versions
      // ["expo-config-plugin-incall-manager", {
      //   // Future configuration options could go here
      // }]
    ],
    android: {
      package: "com.example.incallmanager",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      }
    },
    ios: {
      bundleIdentifier: "com.example.incallmanager",
      supportsTablet: true
    }
  }
};
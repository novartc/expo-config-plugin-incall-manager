# expo-config-plugin-incall-manager

📱 **A Config Plugin for integrating `react-native-incall-manager` into Expo or React Native projects** — automatically adds required permissions, Podfile entries, and Android native linking.

## 🚀 Installation

```bash
npm install react-native-incall-manager expo-config-plugin-incall-manager
```

or

```bash
yarn add react-native-incall-manager expo-config-plugin-incall-manager
```

## 🧩 Usage (in app.json or app.config.js)

### Option 1 – JSON config (app.json)
```json
{
  "expo": {
    "plugins": ["expo-config-plugin-incall-manager"]
  }
}
```

### Option 2 – JS config (app.config.js)
```javascript
module.exports = {
  expo: {
    name: "my-app",
    slug: "my-app",
    plugins: [
      "expo-config-plugin-incall-manager"
    ]
  }
};
```

## 🛠 What this plugin does automatically

✅ **Adds these Android permissions to AndroidManifest.xml:**

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.BLUETOOTH_PRIVILEGED" />
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
<uses-permission android:name="android.permission.BLUETOOTH_ADVERTISE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
```

✅ **Modifies settings.gradle and build.gradle to include:**

```gradle
include ':react-native-incall-manager'
project(':react-native-incall-manager').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-incall-manager/android')
implementation(project(':react-native-incall-manager'))
```

✅ **Updates MainApplication.java with:**

```java
import com.zxcpoiu.incallmanager.InCallManagerPackage;
packages.add(new InCallManagerPackage());
```

✅ **Adds iOS Pod dependency:**

```ruby
pod 'ReactNativeIncallManager', :path => '../node_modules/react-native-incall-manager'
```

## ⚠️ Requirements

- Expo SDK 48+ or React Native 0.70+
- EAS Build (for managed workflow)
- `react-native-incall-manager` installed in your project

## 📱 Usage in your React Native code

After installing and configuring the plugin, you can use `react-native-incall-manager` in your app:

```javascript
import InCallManager from 'react-native-incall-manager';

// Start call management
InCallManager.start({media: 'audio'});

// Stop call management
InCallManager.stop();

// Enable/disable speaker
InCallManager.setSpeakerphoneOn(true);

// Turn screen on/off
InCallManager.turnScreenOn();
InCallManager.turnScreenOff();
```

## 🏗 Building your app

After adding the plugin to your config, you need to regenerate the native code:

```bash
# For Expo managed workflow
expo prebuild --clean

# Then build
eas build --platform all
```

```bash
# For bare React Native
cd ios && pod install
```

## 🧑‍💻 Contributing

PRs and issues are welcome! Please open a GitHub issue if you encounter any linking or permission problems.

## 📄 License

MIT © Ahsan Zia

---

## 🔧 Troubleshooting

### Android Build Issues
- Make sure you have the correct Android permissions in your `AndroidManifest.xml`
- Verify that the plugin is properly linked in `settings.gradle` and `build.gradle`
- Check that `MainApplication.java` includes the InCallManagerPackage

### iOS Build Issues
- Ensure the pod is properly added to your `Podfile`
- Run `cd ios && pod install` after adding the plugin
- Clean and rebuild your project if needed

### Plugin Not Working
- Make sure you've run `expo prebuild --clean` after adding the plugin
- Verify the plugin is listed in your `app.json` or `app.config.js`
- Check that `react-native-incall-manager` is installed as a dependency

### Need Help?
Open an issue on GitHub with:
- Your Expo SDK version
- Your React Native version
- Full error logs
- Your config file (`app.json` or `app.config.js`)
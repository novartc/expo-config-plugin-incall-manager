const {
  withAndroidManifest,
  withDangerousMod,
  withPlugins,
} = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const ANDROID_PERMISSIONS = [
  'android.permission.MODIFY_AUDIO_SETTINGS',
  'android.permission.RECORD_AUDIO',
  'android.permission.BLUETOOTH',
  'android.permission.BLUETOOTH_ADMIN',
  'android.permission.BLUETOOTH_CONNECT',
  'android.permission.BLUETOOTH_PRIVILEGED',
  'android.permission.BLUETOOTH_SCAN',
  'android.permission.BLUETOOTH_ADVERTISE',
  'android.permission.WAKE_LOCK',
  'android.permission.FOREGROUND_SERVICE',
  'android.permission.FOREGROUND_SERVICE_MICROPHONE',
  'android.permission.POST_NOTIFICATIONS',
];

function addAndroidPermissions(config) {
  return withAndroidManifest(config, async (config) => {
    const manifest = config.modResults.manifest;
    const existingPermissions = manifest['uses-permission'] || [];
    const existingPermissionNames = new Set(
      existingPermissions
        .map((permission) => permission.$ && permission.$['android:name'])
        .filter(Boolean)
    );

    const permissionsToAdd = ANDROID_PERMISSIONS
      .filter((name) => !existingPermissionNames.has(name))
      .map((name) => ({ $: { 'android:name': name } }));

    manifest['uses-permission'] = [...existingPermissions, ...permissionsToAdd];
    return config;
  });
}

function addIosPod(config) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      if (!fs.existsSync(podfilePath)) return config;

      let podfileContent = fs.readFileSync(podfilePath, 'utf8');
      const podLine = `pod 'ReactNativeIncallManager', :path => '../node_modules/@novartc/react-native-incall-manager'`;

      if (!podfileContent.includes(podLine)) {
        podfileContent = podfileContent.replace(
          /use_native_modules!\n/,
          `use_native_modules!\n${podLine}\n`
        );
        fs.writeFileSync(podfilePath, podfileContent);
      }
      return config;
    },
  ]);
}

function addAndroidNativeLinking(config) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const settingsGradlePath = path.join(config.modRequest.platformProjectRoot, 'settings.gradle');
      const buildGradlePath = path.join(config.modRequest.platformProjectRoot, 'app', 'build.gradle');
      const appSrcPath = path.join(config.modRequest.platformProjectRoot, 'app', 'src', 'main', 'java');

      // --- settings.gradle ---
      if (fs.existsSync(settingsGradlePath)) {
        let settingsGradle = fs.readFileSync(settingsGradlePath, 'utf8');
        if (!settingsGradle.includes("novartc_react-native-incall-manager")) {
          settingsGradle += `
include ':novartc_react-native-incall-manager'
project(':novartc_react-native-incall-manager').projectDir = new File(rootProject.projectDir, '../node_modules/@novartc/react-native-incall-manager/android')
`;
          fs.writeFileSync(settingsGradlePath, settingsGradle);
        }
      }

      // --- app/build.gradle ---
      if (fs.existsSync(buildGradlePath)) {
        let buildGradle = fs.readFileSync(buildGradlePath, 'utf8');
        if (!buildGradle.includes("implementation(project(':novartc_react-native-incall-manager'))")) {
          buildGradle = buildGradle.replace(
            /(dependencies\s*{[\s\S]*?)(^\})/m,
            (match, depsBlock, closingBrace) => {
              return `${depsBlock}    implementation(project(':novartc_react-native-incall-manager'))\n${closingBrace}`;
            }
          );
          fs.writeFileSync(buildGradlePath, buildGradle);
        }
      }

      // --- MainApplication.java ---
      function findMainApplication(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const fullPath = path.join(dir, file);
          if (fs.statSync(fullPath).isDirectory()) {
            const result = findMainApplication(fullPath);
            if (result) return result;
          } else if (file === 'MainApplication.java') {
            return fullPath;
          }
        }
        return null;
      }

      const mainAppPath = findMainApplication(appSrcPath);
      if (mainAppPath) {
        let mainAppContent = fs.readFileSync(mainAppPath, 'utf8');
        if (!mainAppContent.includes('import com.zxcpoiu.incallmanager.InCallManagerPackage;')) {
          mainAppContent = mainAppContent.replace(
            'import com.facebook.react.ReactApplication;',
            `import com.facebook.react.ReactApplication;\nimport com.zxcpoiu.incallmanager.InCallManagerPackage;`
          );
        }
        if (!mainAppContent.includes('packages.add(new InCallManagerPackage())')) {
          mainAppContent = mainAppContent.replace(
            /return packages;/,
            `packages.add(new InCallManagerPackage());\n    return packages;`
          );
        }
        fs.writeFileSync(mainAppPath, mainAppContent);
      }

      return config;
    },
  ]);
}

function withIncallManager(config) {
  return withPlugins(config, [addAndroidPermissions, addAndroidNativeLinking, addIosPod]);
}

module.exports = withIncallManager;

# Contributing to @config-plugins/react-native-incall-manager

Thank you for your interest in contributing! This guide will help you get started.

## 🚀 Quick Start

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/config-plugins-react-native-incall-manager.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test the changes with the example app
6. Submit a pull request

## 🧪 Testing Your Changes

### Using the Example App

1. Navigate to the example directory:
   ```bash
   cd example
   npm install
   ```

2. Test with Expo:
   ```bash
   expo prebuild --clean
   expo run:android  # or expo run:ios
   ```

3. Verify that:
   - All permissions are correctly added to AndroidManifest.xml
   - iOS Podfile includes the ReactNativeIncallManager pod
   - Android native linking is properly configured
   - The app builds and runs without errors

### Manual Testing

1. Check generated Android files:
   - `android/app/src/main/AndroidManifest.xml` (permissions)
   - `android/settings.gradle` (project inclusion)
   - `android/app/build.gradle` (dependency)
   - `android/app/src/main/java/.../MainApplication.java` (package registration)

2. Check iOS files:
   - `ios/Podfile` (pod inclusion)

## 📝 Code Style

- Use 2 spaces for indentation
- Follow existing code patterns
- Add comments for complex logic
- Keep functions focused and single-purpose

## 🐛 Reporting Issues

When reporting issues, please include:

1. **Environment**: Expo SDK version, React Native version, OS
2. **Steps to reproduce**: Clear, step-by-step instructions
3. **Expected behavior**: What should happen
4. **Actual behavior**: What actually happens
5. **Logs**: Any error messages or relevant logs
6. **Code**: Relevant configuration files (app.json, package.json)

## 📋 Pull Request Process

1. **Update documentation**: Update README.md if you change functionality
2. **Test thoroughly**: Ensure your changes work on both iOS and Android
3. **Follow conventional commits**: Use clear, descriptive commit messages
4. **Update CHANGELOG**: Add your changes to the Unreleased section
5. **Keep PRs focused**: One feature/fix per pull request

### Conventional Commit Format

```
type(scope): description

[optional body]

[optional footer]
```

Examples:
- `feat: add support for custom permissions configuration`
- `fix: resolve duplicate permission issue on Android`
- `docs: update installation instructions`
- `refactor: simplify Android linking logic`

## 🏗️ Development Guidelines

### File Structure
```
@config-plugins/react-native-incall-manager/
├── plugin/
│   ├── withIncallManager.js    # Main plugin logic
├── example/                    # Test app
├── index.js                    # Package entry point
├── package.json
├── README.md
└── LICENSE
```

### Adding New Features

1. **Consider backwards compatibility**: Don't break existing configurations
2. **Add configuration options**: Make features configurable when possible
3. **Update the example**: Show how to use new features
4. **Document thoroughly**: Update README and add code comments

### Common Areas for Contribution

- **Error handling**: Better error messages and recovery
- **Configuration options**: More granular control over permissions
- **Platform support**: Ensure compatibility with different RN/Expo versions
- **Documentation**: Examples, troubleshooting guides, blog posts
- **Testing**: Automated tests, more example configurations

## 🤝 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Assume positive intent

## 📚 Resources

- [Expo Config Plugins Documentation](https://docs.expo.dev/config-plugins/introduction/)
- [React Native InCall Manager Library](https://github.com/react-native-webrtc/react-native-incall-manager)
- [Android Permissions Reference](https://developer.android.com/reference/android/Manifest.permission)
- [iOS Permission Reference](https://developer.apple.com/documentation/bundleresources/information_property_list)

## ❓ Questions?

Feel free to open an issue for questions or join discussions in existing issues. We're here to help!

---

Thank you for contributing! 🎉
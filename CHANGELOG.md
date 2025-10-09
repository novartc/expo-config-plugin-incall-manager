# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-XX

### Added
- Initial release of @config-plugins/react-native-incall-manager
- Automatic Android permissions injection for call management
- iOS Podfile modification for react-native-incall-manager
- Android native linking (settings.gradle, build.gradle, MainApplication.java)
- Support for all required Bluetooth and audio permissions
- Example app demonstrating plugin usage
- Comprehensive README with installation and usage instructions

### Features
- ✅ Android permissions: RECORD_AUDIO, BLUETOOTH_*, WAKE_LOCK, FOREGROUND_SERVICE
- ✅ iOS Pod linking for ReactNativeIncallManager
- ✅ Android Gradle configuration
- ✅ MainApplication.java package registration
- ✅ Expo SDK 48+ compatibility
- ✅ React Native 0.70+ support

## [Unreleased]

### Planned
- Configuration options for selective permission inclusion
- TypeScript definitions
- Test suite
- More detailed error handling
- Support for custom package names
# Android TWA Shell

This folder contains the Android wrapper project for publishing the Huong Nghiep Song An PWA to Android through Trusted Web Activity.

## What you still need before a release build

- A real HTTPS production origin, for example `https://app.example.com/`
- Android Studio with JDK 17 and Android SDK 35+
- A signing setup for release
- A real `assetlinks.json` file hosted at `https://YOUR_HOST/.well-known/assetlinks.json`

## Replace these placeholders first

Open `app/build.gradle.kts` and replace:

- `your-public-domain.example`
- `https://your-public-domain.example/`
- `vn.songan.huongnghiep` if you want a different package name

## Build direction

1. Open this folder in Android Studio.
2. Install SDK Platform 35 and Build Tools.
3. Confirm the launch URL and domain placeholders are replaced.
4. Add the real release signing config.
5. Build an Android App Bundle for Play Store release.

This folder does not include a generated Gradle wrapper because the current machine does not have Java or Gradle installed.

## Important

If Digital Asset Links verification fails, the app will open as a Custom Tab instead of a fully trusted TWA.

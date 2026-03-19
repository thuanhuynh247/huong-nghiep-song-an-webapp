# Android TWA / Play Store Plan

This repo now includes a native Android wrapper project in `android-twa/` for publishing the PWA through Trusted Web Activity.

## What is already prepared

- Android app shell targeting API 35
- Trusted Web Activity launcher activity
- App Links intent filter with `android:autoVerify="true"`
- Brand colors and launcher icon resources
- Sample Digital Asset Links file

## What must be finalized before release

1. Publish the PWA on a real HTTPS origin.
2. Replace the placeholder host and launch URL in `android-twa/app/build.gradle.kts`.
3. Upload the final `assetlinks.json` to `https://YOUR_HOST/.well-known/assetlinks.json`.
4. Build and sign an Android App Bundle.
5. Upload the AAB to Play Console with Play App Signing enabled.
6. Update the hosted `assetlinks.json` with the Play App Signing SHA-256 fingerprint.
7. Test verification on a real Android device.

## Why the fingerprint step matters

If you use Play App Signing, the certificate on user devices will usually be the Play signing certificate, not the local keystore certificate. Your final `assetlinks.json` should use the Play signing fingerprint.

## Official references

- Trusted Web Activity overview: https://developer.android.com/develop/ui/views/layout/webapps/trusted-web-activities
- App Links and Digital Asset Links: https://developer.android.com/training/app-links/about
- Play upload and App Bundle guidance: https://developer.android.com/studio/publish/upload-bundle
- Play target API policy: https://support.google.com/googleplay/android-developer/answer/11917020

## Current environment limitation

This workspace does not currently have Java, Gradle, keytool, or Android SDK installed, so the Android App Bundle was not built here. The source project is prepared so the next machine with Android Studio can continue from this point.

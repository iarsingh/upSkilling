# Daily Quest

Daily Quest is a small Android app built for Google Play submission practice. It combines a daily three-item checklist with a 20-second tap game and keeps all user data on the device with `SharedPreferences`.

## What is included

- Native Android app in Java with no third-party SDKs.
- Package name: `com.upskilling.dailyquest`
- Minimum SDK: 23
- Target SDK: 35, matching the current Google Play requirement for new phone/tablet apps.
- No dangerous permissions.
- Local-only data storage.
- Adaptive launcher icon.
- Store listing draft and privacy policy draft.

## Build in Android Studio

1. Install the latest stable Android Studio.
2. Open this folder: `daily-quest`.
3. Let Android Studio sync Gradle and install SDK 35 if prompted.
4. Run the app on an emulator or Android device.

## Create a Play Store release bundle

1. In Android Studio, open `Build > Generate Signed App Bundle / APK`.
2. Choose `Android App Bundle`.
3. Create or select a release keystore.
4. Build the `release` variant.
5. Upload the generated `.aab` file in Play Console.

## Suggested next production tasks

- Replace the simple vector launcher icon with polished 512 x 512 Play artwork.
- Add screenshots from an emulator for phone listing assets.
- Create a Play Console app, complete the Data safety form, and upload the first internal testing release.
- For a personal developer account, complete Google Play's current testing requirements before production release.

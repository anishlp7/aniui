# AniUI × Expo SDK 58 starter (iPhone Duo ready)

This starter runs on Expo SDK 58 (React Native 0.88, iOS 27 scene lifecycle, Node 22.13+). The 149 AniUI components re-lay out automatically when a scene is resized, so the app is ready for iPhone Duo on day one. The 10 overlay components (Dialog, Popover, HoverCard, DropdownMenu, ContextMenu, Tooltip, BottomSheet, ActionSheet, Toast, CommandMenu) consume `useFoldFeatures()` from `components/ui/fold.tsx` and shift away from the fold line when `expo-hinge` reports an unfolded Duo — a no-op on every other device.

See `/docs/iphone-duo` and `/docs/expo-58` for the full migration + support story.

---

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. (First-time only) regenerate the native `android/` and `ios/` folders for SDK 58.

   The committed native folders — if any ship — may be inherited from an earlier
   SDK and have the wrong Gradle version pinned (SDK 58 requires Gradle 9.4.1+).
   `expo prebuild --clean` regenerates both folders fresh with versions matched
   to this starter's SDK:

   ```bash
   npx expo prebuild --clean
   ```

3. Start the app

   ```bash
   npx expo start
   # Or build directly:
   npx expo run:ios
   npx expo run:android
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

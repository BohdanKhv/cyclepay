<h1 align="center">Cyclepay</h1>


Cyclepay is the app that lets you keep track of your subscriptions and other expenses.
It is an open source project, so feel free to use it as you wish, if you find it useful.
Feel free to contribute to the project.
For any questions, suggestions or bug reports, please contact me via email or GitHub.

## Screenshots

[![Main screen][screen1th]][screen1]
[![Main screen dark mode][screen2th]][screen2]
[![Cycle details][screen3th]][screen3]
[![Search screen][screen4th]][screen4]

## Features

* Add, edit and delete cycle expenses
* Set reminders for cycle expenses
* Monthly, yearly and daily summaries
* Dark mode
* All data is stored locally on your device
* Completely ad-free
* Completely offline
* Completely free and open source

## Build

create the folder:
`mkdir android/app/src/main/assets`

run the command: 
`npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res --verbose`

And then run
`cd android && ./gradlew assembleDebug && cd ..`
`cd android && ./gradlew assembleRelease && cd ..`

## ----------------------------
## ??? 😬🤯
`cd android && ./gradlew clean && cd ..`
`cd android && ./gradlew assembleRelease -x bundleReleaseJsAndAssets && cd ..`
`cd android && ./gradlew bundleRelease -x bundleReleaseJsAndAssets && cd ..`

[screen1]: screenshots/1.jpg
[screen2]: screenshots/2.jpg
[screen3]: screenshots/3.jpg
[screen4]: screenshots/4.jpg
[screen1th]: screenshots/1.thumb.jpg
[screen2th]: screenshots/2.thumb.jpg
[screen3th]: screenshots/3.thumb.jpg
[screen4th]: screenshots/4.thumb.jpg
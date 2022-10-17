<h1 align="center">Cyclepay</h1>
<p align="center">
  <a href="https://github.com/iSoron/uhabits/actions?query=workflow%3A%22Build+%26+Test%22">
    <img src="https://github.com/iSoron/uhabits/workflows/Build%20&%20Test/badge.svg" />
  </a>
  <a href="https://github.com/iSoron/uhabits/releases/latest">
    <img src="https://img.shields.io/github/v/release/iSoron/uhabits" />
  </a>
  <a href="https://github.com/iSoron/uhabits/discussions">
    <img src="https://img.shields.io/badge/GitHub-Discussions-%23fc4ebc" />
  </a>
</p>

Cyclepay is the app that lets you keep track of your subscriptions and other expenses.
This is a personal project, so it is not intended to be used by anyone else.
It is an open source project, so feel free to use it as you wish, if you find it useful.
Feel free to contribute to the project.
For any questions, suggestions or bug reports, please contact me via email or GitHub.

## Screenshots

[![Main screen][screen1]]
[![Main screen dark mode][screen2]]
[![Cycle details][screen3]]
[![Search screen][screen4]]

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

[screen1]: screenshots/1.png
[screen2]: screenshots/2.png
[screen3]: screenshots/3.png
[screen4]: screenshots/4.png
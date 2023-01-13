# React Native Todo App

A simple todo app in order to practice concepts within React Native.
Using an library to provide async storage, the todo list is preserved even if the app is reloaded.
When an item is deleted, it is also removed from the async storage.

## Technologies
- React Native (with Expo)
- TypeScript
- [react-native-async-storage](https://react-native-async-storage.github.io/async-storage/)

## To run 
- ```npm install``` to install dependencies
- ```npm start``` to start the expo cli, then you can connect your preferred device with the QR code and Expo Go, or run via an emulator.

## To debug
- Once running on a device or emulator, you can debug with react-devtools by running ```npm run dev```
- An application should pop-up, allow it and then open the in-app developer menu to connect.
- A page will open and if you inspect this with your browser dev tool then you can view your console logs in the console tab.
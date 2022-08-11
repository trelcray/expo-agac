import { Routes } from "./src/routes";
import { NativeBaseProvider, StatusBar } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </NativeBaseProvider>
  );
}
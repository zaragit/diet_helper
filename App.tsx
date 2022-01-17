import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContextProvider } from "./contexts/AuthContext";
import RootNavigator from "./navigation/RootNaigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <RootNavigator />
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}

import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <NavigationIndependentTree>
            <AppNavigator />
          </NavigationIndependentTree>
        </NavigationContainer>

      </AuthProvider>
    </SafeAreaProvider>
  );
}





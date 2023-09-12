import { Roboto_700Bold, Roboto_400Regular, useFonts } from '@expo-google-fonts/roboto';
import theme from './src/theme';
import { ThemeProvider } from 'styled-components/native'
import { StatusBar } from 'react-native';
import { Routes } from '@routes/index';
import { Loading } from '@components/Loading';
//npm install --save-dev @types/styled-components @types/styled-components-react-native // npm i styled-components@5.3.10
//npm install @react-navigation/native
//npx expo install react-native-screens react-native-safe-area-context
//npm install @react-navigation/native-stack
//@ npm install --save-dev babel-plugin-module-resolver
//npx expo install expo-font @expo-google-fonts/roboto
//npm install --save phosphor-react-native // npx expo install react-native-svg
//npx expo install @react-native-async-storage/async-storage

export default function App() {

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  );
}
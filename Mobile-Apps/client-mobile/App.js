import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import ProductDetail from './screens/ProductDetail';
import client from './config/apollo';
import ImageScreen from './screens/Image';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Products" component={Home} />
            <Stack.Screen name="Product Detail" component={ProductDetail} />
            <Stack.Screen name="Image" component={ImageScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaView>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import MainContainer from './navigation/MainContainer';
import Navigation from './navigation/StackNav';


export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Navigation />

      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

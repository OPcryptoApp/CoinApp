import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import MainContainer from './navigation/MainContainer';


export default function App() {
  return (
    <View style={styles.container}>
      {/*<Header />*/}
      <MainContainer />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

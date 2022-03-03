import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import MainContainer from './navigation/MainContainer';


//branch testi

export default function App() {
  return (
    <View style={styles.container}>
      {/*<Header />*/}
      <MainContainer />

      
    </View>
  );
}

// testiä testiä
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

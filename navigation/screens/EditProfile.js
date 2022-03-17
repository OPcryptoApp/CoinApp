import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet,
    Alert,
  } from 'react-native';

export default function EditProfileScreen() {

    return (

        <View style={styles.container}>
            <View style={{margin: 20}}>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => {}}>
                        <View style={{
                            height: 100,
                            width: 100,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <ImageBackground
                            source={{
                                uri: 'https://www.flickr.com/photos/gsfc/6760135001' 
                            }}
                            style={{height:100, width: 100}}
                            imageStyle={{borderRadius: 15}}
                            >
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                </View>
        <View style={styles.action}>
          <Text size={20} />
          <TextInput
            placeholder="Name"
            placeholderTextColor="#FFFFFF"
            autoCorrect={false}
            style={[
              styles.textInput,
            ]}
          />
        </View>
        <View style={styles.action}>
          <Text size={20} />
          <TextInput
            placeholder="@"
            placeholderTextColor="#FFFFFF"
            autoCorrect={false}
            style={[
              styles.textInput,
            ]}
          />
        </View>
        <View style={styles.action}>
          <Text size={20} />
          <TextInput
            placeholder="Bio"
            placeholderTextColor="#FFFFFF"
            autoCorrect={false}
            style={[
              styles.textInput,
            ]}
          />
        </View>
        <View style={styles.action}>
          <Text size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#FFFFFF"
            autoCorrect={false}
            style={[
              styles.textInput,
            ]}
          />
        </View>
        <View style={styles.action}>
          <Text size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
            autoCorrect={false}
            style={[
              styles.textInput,
            ]}
          />
        </View>
        <View style={styles.action}>
          <Text size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#FFFFFF"
            autoCorrect={false}
            style={[
              styles.textInput,
            ]}
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={() => {}}>
            <Text>Save</Text>
        </TouchableOpacity>
    </View>
</View>
    );
 };

 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0C2432',
    },
    commandButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#00FF00',
      alignItems: 'center',
      marginTop: 10,
    },
    panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: 27,
      height: 35,
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: 30,
      marginBottom: 10,
    },
    panelButton: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: '#FF6347',
      alignItems: 'center',
      marginVertical: 7,
    },
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#FFFFFF',
    },
  });
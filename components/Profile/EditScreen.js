// Nimee ehkä uudelleen.
// Tähän komponentti navigation/screens/EditProfile.js :stä

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  Platform
} from 'react-native';
import styles from './styles';

export default function ProfileSettingsScreen() {

  return (

    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => { }}>
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
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
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
        <TouchableOpacity style={styles.commandButton} onPress={() => { }}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
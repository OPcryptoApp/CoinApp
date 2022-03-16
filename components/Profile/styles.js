import { StyleSheet } from "react-native";

export default StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#0C2432',
        },
        userInfoSection: {
          paddingHorizontal: 30,
          marginBottom: 25,
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#FFFFFF',
        },
        text: {
          fontSize: 20,
          color: '#FFFFFF',
        },
        caption: {
          fontSize: 14,
          lineHeight: 14,
          fontWeight: '500',
          color: '#FFFFFF',
        },
        row: {
          flexDirection: 'row',
          marginBottom: 10,
        },
        infoBoxWrapper: {
          borderBottomColor: '#dddddd',
          borderBottomWidth: 1,
          borderTopColor: '#dddddd',
          borderTopWidth: 1,
          flexDirection: 'row',
          height: 100,
        },
        infoBox: {
          width: '50%',
          alignItems: 'center',
          justifyContent: 'center',
        },
        menuWrapper: {
          marginTop: 10,
        },
        menuItem: {
          flexDirection: 'row',
          paddingVertical: 15,
          paddingHorizontal: 30,
        },
        menuItemText: {
          color: '#777777',
          marginLeft: 20,
          fontWeight: '600',
          fontSize: 16,
          lineHeight: 26,
        },
        logout: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        },
         button: {
          backgroundColor: '#0782F9',
          width: '60%',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
          marginTop: 40,
        },
        buttonText: {
          color: 'white',
          fontWeight: '700',
          fontSize: 16,
        },
});
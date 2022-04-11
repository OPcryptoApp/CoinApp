import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
    shadowOffset: { width: -1, height: -3 },
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

/* 
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
}); */
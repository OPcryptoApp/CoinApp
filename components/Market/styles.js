import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        backgroundColor:'#0C2432',
        flex: 1,
       
        marginBottom: 5,
        
    },
    item: {
        backgroundColor:'gray',
        justifyContent: 'space-between',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    image: {
        height: 30,
        width: 30,
        marginRight: 10,
        alignSelf: 'center',
    },
    name: {
        fontWeight:'bold',
        fontSize: 18,
        color:'white',
        justifyContent: 'flex-start',
    },
    rank: {
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    change: {
        color:'#10C22C',
        textAlign:'right',
        fontWeight:'bold',
    },
    title: {
        fontWeight: 'bold'
    },
 
   
});
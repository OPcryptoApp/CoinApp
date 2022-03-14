import { StyleSheet } from 'react-native';
// stylesheet luonti tänne ja import coin indexiin



export default StyleSheet.create({
    container: {
        flex: 1,
        //flexDirection:'row',
        marginBottom: 5,
    },
    item: {
        backgroundColor:'#3c4f5a',
        justifyContent: 'space-between',
        marginVertical: 2,
        marginHorizontal: 16,
        borderRadius: 5,
        padding:5,
      
    },
    image: {
        height: 30,
        width: 30,
        marginRight: 10,
        alignSelf: 'center',
        //justifyContent:'center',

    },
    name: {
        marginLeft:5,
        color:'white',
        fontSize: 15,
        color:'white',
        fontWeight:'bold',
        justifyContent:'flex-start'
       /* fontWeight:'bold',
        justifyContent: 'flex-start',
        flexDirection: 'row',*/
    },
    rank: {
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        flexDirection: 'row',
 
    },
    change: {
        color: 'gray', //'#10C22C',
        textAlign:'right',
        fontWeight:'bold',
    },

    price: {
        fontWeight:'bold',
        color:'white',
    },

    left: {
        marginLeft:'auto',
    },

    flexRow: {
        flexDirection:'row',
        alignItems:'center'
    }

    

});
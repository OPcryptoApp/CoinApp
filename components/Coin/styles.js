import { StyleSheet } from 'react-native';
// stylesheet luonti tänne ja import coin indexiin

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
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
});
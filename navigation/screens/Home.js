import * as React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import PortfolioWindow from '../../components/PortfolioWindow';
import Coin from '../../components/Coin';

export default function HomeScreen({navigation}){

    

    return (
        <View style={{flex: 1, paddingTop: 20, backgroundColor:'#0C2432' }}>
            <View>
            <PortfolioWindow />
            
            </View>
            <View>
            <Text style={{color:'white', fontWeight:'bold', fontSize:20, marginBottom:5}}> Coins </Text>
            
            {/* <Text
                onPress={() => alert('This is the "Home" screen.')}
           style={{ fontSize: 26, fontWeight: 'bold' }}>Home Screen</Text> */}
           </View>
           <Coin/>
        </View>
    );
}



import * as React from 'react';
import { View, Text } from 'react-native';

export default function PortfolioWindow() {

    return(
        <View style={{alignItems:'center', paddingBottom: 50}}>
            <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>PORTFOLIO</Text>
            <Text style={{color:'white', fontWeight:'bold', fontSize:40, padding:10}}>$7 867,67</Text>
            <Text style={{color:'red'}}>17.63%</Text>
        </View>
    )
}
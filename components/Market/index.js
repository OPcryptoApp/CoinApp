import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SvgUri } from 'react-native-svg';
import styles from './styles'
import millify from 'millify';
import { useNavigation } from "@react-navigation/native";





import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

// import .env tiedostosta api-avaimet ja muut, jotka ei kuulu githubiin
import { COIN_API, SECRET_KEY } from "@env"


export default function Market() {


    const navigation = useNavigation();



    const [numberOfCoins, setnumberOfCoins] = useState(100)
    const [listData, setListData] = useState([])
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(async () => {
        var a = numberOfCoins
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value !== null) {
                console.log('value get', parseInt(value))
                // value previously stored
                setnumberOfCoins(parseInt(value))
                a = parseInt(value)
            }
        } catch (e) {
            // error reading value
        }

        axios.request({
            method: 'GET',
            url: 'https://coinranking1.p.rapidapi.com/coins',
            params: {
                referenceCurrencyUuid: '5k-_VTxqtCEI',
                timePeriod: '24h',
                tiers: '1',
                orderBy: 'marketCap',
                orderDirection: 'desc',
                limit: a,
                offset: '0'
            },
            headers: {
                'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
                // Tuomon api avain.
                'x-rapidapi-key': process.env.COIN_API
            }
        }).then(function (response) {

            setListData(response.data.data.coins)
        }).catch(function (error) {
            console.error(error);
        });

    }, [])



    const DataItem = ({ rank }) => (
        <Text>            Rank: {rank}</Text>
    )



    const PercentageColor = ({ val }) => {
        if (val < 0) {
            return (
                <Text
                    style={styles.changeNeg}>
                    {val}%
                </Text>
            )
        } else {
            return (
                <Text
                    style={styles.changePosit}>
                    {val}%
                </Text>
            )
        }
    };


    const renderItem = ({ item }) => (


        < TouchableOpacity onPress={() => { navigation.navigate('CoinPageScreen', { coinId: item.uuid }) }}>


            <View style={styles.item}>

                <View style={styles.flexRow}>



                    {/* SVG huutaa error
                    //TypeError: null is not an object (evaluating 'children.push')
                    // This error is located at: in SvgXml (created by SvgUri)

                    <SvgUri
                        width="30"
                        height="30"
                        style={styles.image}
                        uri={item.iconUrl}
                    />
                 */}

                    <View style={{ justifyContent: 'center' }}>
                        <Text
                            style={styles.name}>
                            {item.name}
                        </Text>
                        <Text style={styles.sub}>{item.symbol}</Text>
                    </View>
                    <View style={styles.left}>
                    </View>
                    <View style={styles.left}>
                        <View style={styles.left}>
                            <Text style={styles.price}> ${millify(item.price)}</Text>
                        </View>
                        <PercentageColor
                            val={item.change}
                        />
                    </View>
                </View>

            </View>
        </TouchableOpacity >
    )
    return (

        <View style={styles.container}>
            <TextInput style={styles.placeholder} placeholderTextColor='white' placeholder='Search For Coins...'
                onChangeText={(input) => {
                    setSearchTerm(input)
                }}
            ></TextInput>


            <FlatList
                data={listData.filter((item) => {
                    if (searchTerm == "") {
                        return (listData)

                    } else if (item.name.toLowerCase().includes(searchTerm.toLowerCase() || item.symbol.toLowerCase().includes(searchTerm.toLowerCase()))) {
                        console.log(item.symbol)
                        return item
                    }
                })}
                renderItem={renderItem}
                keyExtractor={(item, i) => 'key' + i}

            />
          </View>
        </View>


    );
}



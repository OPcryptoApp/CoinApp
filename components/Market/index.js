import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TextInput,Button } from 'react-native';
import styles from './styles'

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

// import .env tiedostosta api-avaimet ja muut, jotka ei kuulu githubiin
import { COIN_API, SECRET_KEY } from "@env"


export default function Market() {

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

    const renderItem = ({ item }) => (
        <TouchableOpacity>
            <View style={styles.item}>
                <Image
                    source={{ uri: item.iconUrl }}
                    style={styles.image}
                />
                <Text
                    style={styles.name}>
                    {item.name}
                </Text>
                <View style={styles.rank}>
                    <DataItem
                        rank={item.rank} />
                </View>
                <Text
                    style={styles.change}>
                    {item.change}%
                </Text>
            </View>
        </TouchableOpacity>
    ) 
    return (

        <View style={styles.container}>
            <TextInput  style={styles.name} placeholder='Search For Coins'
              onChangeText={(input)=>{
                setSearchTerm(input)
            }}
            ></TextInput>
            

            <FlatList
                data={listData.filter((item)=>{
                    if(searchTerm == ""){
                        return(listData)

                    }else if (item.name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return item
                    }
                })}
                renderItem={renderItem}
                keyExtractor={(item, i) => 'key' + i}
            />
        </View>
    );
}



import * as React from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import screens 
import HomeScreen from './screens/Home';
import PortfolioScreen from './screens/Portfolio';
import SettingScreen from './screens/Settings';
import { Settings } from 'react-native';
import ProfileScreen from './screens/Profile';

//screen names

const homeName = 'Home';
const portfolioName = 'Portfolio';
const settingsName = 'Settings';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();



export default function MainContainer() {

    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {

                            iconName = focused ? 'home' : 'home-outline'
                        } else if (rn == portfolioName) {

                            iconName = focused ? 'bar-chart' : 'bar-chart-outline'
                        } else if (rn == settingsName) {

                            iconName = focused ? 'settings' : 'settings-outline'
                        } else if (rn == profileName) {

                            iconName = focused ? 'person-circle' : 'person-circle-outline'
                        }

                        return <Ionicons name={iconName} size={30}/>
                    },
                })}>
                     <Tab.Screen name = {homeName} component ={HomeScreen}   />
                     <Tab.Screen name = {portfolioName} component ={PortfolioScreen}   />
                     <Tab.Screen name = {settingsName} component ={SettingScreen}   />
                     <Tab.Screen name = {profileName} component ={ProfileScreen}   />


            </Tab.Navigator>
        </NavigationContainer>
    )
}

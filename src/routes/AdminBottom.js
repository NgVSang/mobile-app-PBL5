import { StyleSheet, Text, View,Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import AccountScreen from '../screens/UserScreen/Home/account_screen';
import HomeScreen from '../screens/AdminScreen/Home/home_screen';

const Tab = createBottomTabNavigator();

const AdminBottom = ({navigation,route}) => {

    const tabBarIconOptions = (icon,IconWidth,Iconheight,focused,badge)=> {
        return(
            <View style={focused && styles.iconProvider}>
                <View style={focused && styles.icon}>
                    <Image source={icon} style={ {
                        tintColor:focused?'#0F6AA9':'black',
                        width: IconWidth,
                        height:Iconheight
                    }}/>
                </View>
            </View>
        )
    }
    
    const tabBarLabelOption = (title,focused)=>
        (
            <Text style={{
                fontSize:12,
                fontWeight:'400',
                color:focused?'#0F6AA9':'#394B6A',
            }}>{title}</Text>
        )
    return (
        <Tab.Navigator 
            initialRouteName = {
                'HomeAdmin'
            }
        >
            <Tab.Screen name='HomeAdmin' component={HomeScreen} options={{
                tabBarStyle:{},
                tabBarIcon: ({focused}) =>tabBarIconOptions(
                    require('../assets/icons/home_icon.png'),18,19,focused
                ),
                tabBarLabel:({focused}) =>tabBarLabelOption('Trang chủ',focused),
                headerShown:false,

            }}/>
            <Tab.Screen name='ProfileUser' component={AccountScreen} options={{
                tabBarIcon: ({focused}) =>tabBarIconOptions(
                    require('../assets/icons/account_icon.png'),18,19,focused,true
                ),
                tabBarLabel:({focused}) =>tabBarLabelOption('Tài khoản',focused),
                headerShown:false
                }}
            />
        </Tab.Navigator>
    )
}

export default AdminBottom

const styles = StyleSheet.create({})
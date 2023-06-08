import { StyleSheet, Text, View, TouchableOpacity,Image, ScrollView  } from 'react-native'
import React from 'react'
import {useSelector} from 'react-redux'
import dayjs from 'dayjs'

const HomeScreen = ({navigation,route}) => {
    const {user,token} = useSelector(state => state.auth)

    return (
        <View style={{flex:1 ,backgroundColor:'#eef2ff'}}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.header_left} onPress={()=>{
                    // navigation.push('Profile')
                }}>
                    {/* <Image 
                        source={{uri:(user.avatar)}}
                        style={{
                            width:40,
                            height:40,
                            resizeMode:'cover',
                            borderRadius:6,
                            marginRight:10,
                        }}
                    /> */}
                    <Image 
                        source={{uri:"https://duhung.vn/wp-content/uploads/2023/01/Promethean-7.jpg"}}
                        style={{
                            width:40,
                            height:40,
                            resizeMode:'cover',
                            borderRadius:6,
                            marginRight:10,
                        }}
                    />
                    <View>
                        <Text style={styles.header_left_hi}>XIN CHÀO!</Text>
                        <Text  style={styles.header_left_name}>{user.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scroll_view}>
                <Text style={{
                    marginBottom:10,
                    fontWeight: '500',
                    fontSize:16
                }}>
                    Hôm nay, {dayjs(new Date()).format("DD / MM / YYYY")}
                </Text>
                <TouchableOpacity style={styles.manager_box} onPress={()=>{
                        // navigation.push("/user/class")
                    }
                    }>
                        <View style={styles.manager_box_icon}>
                            <Image 
                                source={require('../../../assets/icons/class_icon.png')}
                                style={{
                                    width:26.21,
                                    height:32,
                                    resizeMode:'contain'
                                }}
                            />
                        </View>
                        <Text style={styles.manager_content}>Danh sách lớp</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        paddingHorizontal:15,
        marginTop:50,
        paddingBottom:15,
        alignItems:'center'
    },
    header_left:{
        flexDirection:'row'
    },
    header_left_hi:{
        fontSize:11,
        lineHeight:16,
        color:'#394B6A',
        fontWeight:'400',
    },
    header_left_name:{
        fontSize:17,
        fontWeight:'500',
        lineHeight:24,
        color:'#2E333D',
    },
    header_right:{
        flexDirection:'row'
    },
    header_right_point:{
        fontSize:13,
        fontWeight:'500',
        lineHeight:18,
        color:'#394B6A',
    },
    scroll_view:{
        width:'100%',
        flex:1,
        paddingHorizontal:15,
        backgroundColor:'#eef2ff',
        paddingBottom:20
    },
    manager_box:{
        width:'31%',
        paddingHorizontal:15,
        paddingVertical:10,
        flexDirection:'column',
        borderRadius:6,
        shadowColor: '#0000000D',
        shadowOffset: {width: 2, height: 8},
        shadowOpacity: 0,
        shadowRadius: 0,
        backgroundColor:'#FFFFFF',
        justifyContent:'space-between',
        marginBottom:15
    },
    manager_box_icon:{
        width:'auto',
        height:30,
        marginBottom:8
    },
})
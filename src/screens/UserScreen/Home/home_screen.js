import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {useSelector} from 'react-redux'
import Loading from '../../../components/Loading'
import CalenderFullSize from '../../../components/CalenderFullSize'
import {BASE_URL} from '../../../config'
import attandanceService from '../../../services/api/attandance/AttandanceService'
import dayjs from 'dayjs'

const HomeScreen = ({navigation}) => {
    const {user,token} = useSelector(state => state.auth)
    const day = new Date()
    const [isLoading,setIsLoading] = React.useState(true)
    const [attendances,setAttendances] = React.useState()
 
    // console.log(user);
    React.useEffect(()=>{
        if (token){
            setIsLoading(true)
            attandanceService.get_Attandance(dayjs(day).format('YYYY-MM-DD'))
            .then((res)=>{
                console.log(res.data);
                setAttendances(res.data.result)
                setIsLoading(false)
            })
            .catch((error)=>{
                alert(error.message)
                setIsLoading(false)
            })
        }
        return ()=>{}
    },[token])

    const renderAttendances = React.useMemo(()=>{
        const data = []
        for ( let i = 0 ;i < attendances?.length ; i++ ){
            let result = {
                checkIn: '',
                checkOut: '',
            }
            if (attendances[i]?.type === 1){
                result.checkIn = dayjs(attendances[i].createdAt).format('HH:mm:ss')
                if (i+1 != attendances.length){
                    result.checkOut = dayjs(attendances[i+1].createdAt).format('HH:mm:ss')
                }else {
                    result.checkOut= "Not checkout yet"
                }
                data.push(result)
            }
        }
        console.log(data);
        return (
            <View style={{display:'flex'}}>
                <View style={styles.check_wrapper}>
                    <Text style={styles.check_component}>CheckIn</Text>
                    <View style={{
                        width:1,
                        backgroundColor:"#18191a",
                    }}/>
                    <Text style={styles.check_component}>CheckOut</Text>
                </View>
                {
                    data.map((e)=>(
                        <View style={styles.check_wrapper} key={e.checkIn}>
                            <Text style={styles.check_component}>{e.checkIn}</Text>
                            <View style={{
                                width:1,
                                backgroundColor:"#18191a",
                            }}/>
                            <Text style={styles.check_component}>{e.checkOut}</Text>
                        </View>
                    ))
                }
            </View>
        )
    },[attendances])

    return (
        <View style={{flex:1 ,backgroundColor:'#eef2ff'}}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.header_left} onPress={()=>{
                    // navigation.push('Profile')
                }}>
                    <Image 
                        source={{uri:(BASE_URL+user.profilePicture)}}
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
                <View style={styles.manager}>
                    <TouchableOpacity style={styles.manager_box} onPress={()=>{
                        navigation.push("/user/salary")
                    }
                    }>
                        <View style={styles.manager_box_icon}>
                            <Image 
                                source={require('../../../assets/icons/salary_icon.png')}
                                style={{
                                    width:26.21,
                                    height:32,
                                    resizeMode:'contain'
                                }}
                            />
                        </View>
                        <Text style={styles.manager_content}>Bảng lương</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.manager_box} onPress={()=>{
                        navigation.push("/user/request")
                    }
                    }>
                        <View style={styles.manager_box_icon}>
                            <Image 
                                source={require('../../../assets/icons/add_request.png')}
                                style={{
                                    width:26.21,
                                    height:32,
                                    resizeMode:'contain'
                                }}
                            />
                        </View>
                        <Text style={styles.manager_content}>Tạo đơn xin phép</Text>
                    </TouchableOpacity>
                </View>
                <View style={{paddingBottom:10}}>
                    <Text>Hôm nay ngày {dayjs(day).format("DD/MM/YYYY")} </Text>
                </View>
                {
                    isLoading == true ? (
                        <Loading />
                    ):(
                        <View>
                            {renderAttendances}
                        </View>
                    )
                }
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
        alignItems:'center',
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
    manager:{
        flexDirection:'row',
        flexWrap:'wrap',
        columnGap:10,
        rowGap:8,
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
        marginBottom:15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    manager_box_icon:{
        width:'auto',
        height:30,
        marginBottom:8
    },
    scroll_view:{
        width:'100%',
        flex:1,
        paddingHorizontal:15,
        backgroundColor:'#eef2ff',
        paddingBottom:20,
        paddingTop:20,
    },
    check_wrapper:{
        paddingVertical: 10,
        borderColor: '#18191a',
        borderBottomWidth: 1,
        flexDirection:'row',
        display:'flex',
        flex:1
    },
    check_component:{
        fontSize:12,
        fontWeight:'400',
        lineHeight:18,
        color:'#394B6A',
        flex:1,
        alignItems:'center',
        textAlign:'center',
    },
})
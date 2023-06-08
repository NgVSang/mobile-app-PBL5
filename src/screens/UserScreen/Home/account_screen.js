import { StyleSheet, Text, View ,ScrollView,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import Header from '../../../components/layout/Header';
import { useDispatch, useSelector } from 'react-redux'
// import { logout } from '../../store/auth'
import {BASE_URL} from '../../../config/index'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {logout} from '../../../store/actions';

const AccountScreen = ({navigation}) => {
    const {user} = useSelector(state => state.auth)
    const deviceToken = AsyncStorage.getItem("push_token");
    const dispatch = useDispatch();
    const handleLogout = async ()=>{
        const token =  await deviceToken
        let Token
        if (token != null ){
          Token = {
              deviceToken: await deviceToken,

          }
        }else{
          Token = {
              
          }
        }
        dispatch(logout(Token));
    }
    return (
        <View style={{flex:1}}>
            <Header showBtnGoback={false} title='Thông tin tài khoản'/>
            <ScrollView style={styles.scroll_view}>
                <View style={styles.user}>
                    <Image 
                        source={{uri:(BASE_URL+user.profilePicture)}}
                        style={styles.user_img}
                    />
                    <Text style={styles.user_name}>{user.name}</Text>
                    <Text style={styles.user_role}>Nhân viên</Text>
                </View>
                <View style={styles.information}>
                    <View style={styles.information_row}>
                        <View style={styles.infor_left}>
                            <View style={styles.icon}>
                                <Image 
                                    source={require('../../../assets/icons/email_icon.png')}
                                    style={{
                                        width:14,
                                        height:14,
                                    }}
                                />
                            </View>
                            <Text style={styles.text_normal_style}>Email</Text>
                        </View>
                        <View style={styles.infor_right}>
                            <Text style={[styles.text_normal_style,{color:'#2C3442'}]}>{user.email}</Text>
                        </View>
                    </View>
                    <View style={styles.information_row}>
                        <View style={styles.infor_left}>
                            <View style={styles.icon}>
                                <Image 
                                    source={require('../../../assets/icons/phone_icon.png')}
                                    style={{
                                        width:16,
                                        height:16,
                                    }}
                                />
                            </View>
                            <Text style={styles.text_normal_style}>Điện thoại</Text>
                        </View>
                        <View style={styles.infor_right}>
                            <Text style={[styles.text_normal_style,{color:'#2C3442'}]}>{user.phoneNumber}</Text>
                        </View>
                    </View>
                    <View style={styles.information_row}>
                        <TouchableOpacity 
                            style={styles.infor_left}
                            onPress={()=>{
                                navigation.navigate('/user/profile/update')
                            }}
                        >
                            <View style={styles.icon}>
                                <Image 
                                    source={require('../../../assets/icons/account_icon.png')}
                                    style={{
                                        width:14,
                                        height:14,
                                        tintColor:"#126FAF"
                                    }}
                                />
                            </View>
                            <Text style={styles.text_touch_style}>Đổi thông tin</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.information_row}>
                        <TouchableOpacity 
                            style={styles.infor_left}
                            onPress={()=>{
                                navigation.navigate('/user/change-password')
                            }}
                        >
                            <View style={styles.icon}>
                                <Image 
                                    source={require('../../../assets/icons/change_password_icon.png')}
                                    style={{
                                        width:14,
                                        height:14,
                                    }}
                                />
                            </View>
                            <Text style={styles.text_touch_style}>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.information_row}>
                        <TouchableOpacity style={styles.infor_left} onPress={()=>handleLogout()}>
                            <View style={styles.icon}>
                                <Image 
                                    source={require('../../../assets/icons/logout_icon.png')}
                                    style={{
                                        width:14,
                                        height:14,
                                    }}
                                />
                            </View>
                            <Text style={styles.text_touch_style}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            
        </View>
    )
}

export default AccountScreen

const styles = StyleSheet.create({
    scroll_view:{
        backgroundColor:'#F7FAFF',
        flex:1,
    },
    user:{
        paddingTop:30,
        alignItems:'center',
        backgroundColor:'#FFFFFF',
    },
    user_img:{
        width:128,
        height:128,
        borderRadius:6
    },
    user_name:{
        fontSize:14,
        fontWeight:'600',
        lineHeight:22,
        marginTop:12,
        color:'#2C3442',
    },
    user_role:{
        fontSize:11,
        fontWeight:'400',
        lineHeight:16,
        marginTop:4,
        color:'#394B6A',
        textTransform:'uppercase'
    },
    information:{
        backgroundColor:'#FFFFFF',
        paddingTop:30,
        paddingHorizontal:30,
    },
    information_row:{
        paddingVertical:15,
        borderTopColor:'#E1E9F6',
        borderStyle:'solid',
        borderTopWidth:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    infor_left:{
        flexDirection:'row',
        alignItems:'center',
    },
    infor_right:{

    },
    icon:{
        width:16,
        height:16,
        alignItems:'flex-start',
        justifyContent:'center',
        marginRight:10
    },
    text_normal_style:{
        fontSize:13,
        fontWeight:'400',
        lineHeight:22,
        color:'#394B6A'
    },
    text_touch_style:{
        fontSize:13,
        fontWeight:'400',
        lineHeight:22,
        color:'#126FAF'
    },
    footer_style:{
        backgroundColor:'#F7FAFF',
    }
})
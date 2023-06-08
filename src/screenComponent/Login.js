import { StyleSheet, Text, View,ScrollView,Dimensions ,TouchableOpacity} from 'react-native'
import React from 'react'
import { Formik, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {Button} from 'react-native-paper';
import { authValidator } from '../validations'
import WFormInput from '../components/WFormInput'
import NavigationService from '../services/NavigationService';
import {login} from '../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get('window');
const Login = ({navigation}) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth)
    const handleLogin = async data => {
        const deviceToken = await AsyncStorage.getItem('push_token')
        const sentData = {
            ...data,
            deviceToken: deviceToken
        }
        console.log(sentData);
        dispatch(login(sentData))
    };
    return (
        <ScrollView style={styles.screen}>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.title_style}>Đăng nhập</Text>
                </View>
                <View>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={authValidator.LoginSchema}
                        onSubmit={handleLogin}
                    >
                        {({ handleSubmit }) => (
                            <View style={styles.form_group}>
                                <View style={styles.form_input}>
                                    <Field 
                                        name="email"  
                                        title="Email"
                                        keyboardType="email-address" 
                                        component={WFormInput} 
                                        placeholder={('Nhập')} 
                                    />
                                </View>
                                <View style={styles.form_input}>
                                    <Field
                                        name="password"
                                        title="Mật khẩu"
                                        component={WFormInput}
                                        placeholder={('Nhập')}
                                        type="password"
                                    />
                                </View>
                                <TouchableOpacity 
                                    onPress={handleSubmit}
                                    disabled={loading}
                                >
                                    <Button
                                        mode="contained"
                                        button
                                        disabled={loading}
                                        loading={loading}
                                        style={[styles.btn_login,{
                                            shadowColor: '#0000001F',
                                            shadowOffset: {width: 4, height: 12},
                                            shadowOpacity: 0,
                                            shadowRadius: 0,
                                        }]}
                                    >
                                        <Text style={[styles.btn_style,{color:'#FFFFFF'}]}>ĐĂNG NHẬP</Text>
                                    </Button>
                                </TouchableOpacity>
                                <View style={styles.forgotPass}>
                                    <Text style={styles.textForgot} onPress={()=>{}}>Quên mật khẩu ?</Text>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
    screen:{
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        width:width,
        flex:1,
    },
    container:{
        paddingBottom:50
    },
    title:{
        paddingTop:40,
        paddingLeft:42,
        paddingBottom:24
    },
    title_style:{
        fontSize:24,
        lineHeight:30,
        fontWeight:'700',
        color:'#21232E'
    },
    form_group:{
        width:'100%',
        paddingHorizontal:50
    },  
    form_input:{
        marginBottom:24
    },
    footer:{
        alignItems:'center',
        flexDirection:'row',
        width:'100%',
        justifyContent:'center'
    },
    footer_content:{
        fontSize:13,
        fontWeight:'400',
        lineHeight:20,
        color:'#36383A'
    },
    footer_register:{
        fontSize:13,
        fontWeight:'700',
        lineHeight:20,
        color:'#0F6AA9',
        textDecorationLine:'underline'
    },
    btn_style:{
        fontWeight:'700',
        fontSize:13,
        lineHeight:22
    },
    btn_login:{
        width:'100%',
        height:40,
        borderRadius:24,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#0F6AA9',
        shadowColor: '#0000001F',
        shadowOffset: {width: 4, height: 12},
        shadowOpacity: 0,
        shadowRadius: 0,
        marginBottom:30,
    },
})
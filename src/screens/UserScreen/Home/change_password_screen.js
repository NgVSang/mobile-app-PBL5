import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import {useToast} from 'react-native-toast-notifications'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import WTextInput from '../../../components/WTextInput'
import authService from '../../../services/api/auth/AuthService'
import WToast from '../../../components/WToast'
import NavigationService from '../../../services/NavigationService'

const ChangePasswordScreen = ({navigation}) => {
    const [isLoading,setIsLoading] = React.useState(false)
    const [oldPassword,setOldPassword] = React.useState("")
    const [newPassword,setNewPassword] = React.useState("")
    const [confirmPassword,setConfirmPassword] = React.useState("")
    const [message,setMessage] = React.useState("")
    const toast = useToast();

    const onBlurConfirmPassword = () => {
        if (newPassword != confirmPassword){
            setMessage("Xác nhận mật khẩu sai")
        }
        else {
            setMessage("")
        }
    }

    const handleChangePassword = () => {
        setIsLoading(true)
        const data = {
            newPassword:newPassword,
            oldPassword:oldPassword,
            confirmPassword:confirmPassword,
        }
        authService.changePassword(data)
        .then((res)=>{
            if (res.status==1){
                toast.hideAll();
                toast.show(
                    <WToast 
                        content={res.message} 
                        showTouch={false}
                        icon={require('../../../assets/icons/success_icon.png')}
                        iconStyle={{
                            width:24,
                            height:24,
                            marginRight:15,
                            marginTop:5
                        }}
                    />
                    ,{
                    type:'custom_type'
                });
                setIsLoading(false)
                NavigationService.navigate('/user')
            }else throw new Error(res.message)
        })
        .catch((err)=>{
            alert(err.message);
            setIsLoading(false);
        })
    }

    return (
        <View style={{flex:1 ,backgroundColor:'#FFFFFF'}}>
            <Header onGoBack={()=>navigation.goBack()} title='Đổi mật khẩu'/>
            <ScrollView style={styles.scroll_view}>
                <View style={styles.container}>
                    <WTextInput 
                        label="Mật khẩu hiện tại"
                        text={oldPassword}
                        setText={(text)=>setOldPassword(text)}
                        group_style={styles.group_style}
                        secureTextEntry={true}
                    />
                    <WTextInput 
                        label="Mật khẩu mới"
                        text={newPassword}
                        setText={(text)=>setNewPassword(text)}
                        group_style={styles.group_style}
                        secureTextEntry={true}
                    />
                    <WTextInput 
                        label="Nhập lại mật khẩu mới"
                        text={confirmPassword}
                        setText={(text)=>setConfirmPassword(text)}
                        group_style={styles.group_style}
                        secureTextEntry={true}
                        onBlur={onBlurConfirmPassword}
                    />
                    <Text style={styles.error_message}>{message}</Text>
                </View>
            </ScrollView>
            <Footer 
                buttonOkContent={'Lưu'}
                onClickButtonOk={handleChangePassword}
                footer_style={styles.footer_style}
                disabled={isLoading}
                loading={isLoading}
            />
        </View>
    )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
    scroll_view:{
        backgroundColor:'#F7FAFF',
        flex:1,
    },
    container:{
        paddingHorizontal:15,
    },
    group_style:{
        paddingTop:30,
    },
    error_message:{
        fontSize:12,
        color:'#ED1C24',
        paddingTop:10,
    },
    footer_style:{
        backgroundColor:'#FFFFFF'
    },
})
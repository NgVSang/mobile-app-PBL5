import { StyleSheet, Text, View ,ScrollView,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../../components/layout/Header';
import * as ImagePicker from 'expo-image-picker';
// import WTextInput from '../../element/WTextInput';
import {BASE_URL} from '../../../config';
import Footer from '../../../components/layout/Footer';
import {changeProfile} from '../../../store/actions';
import WTextInput from '../../../components/WTextInput';
import WToast from '../../../components/WToast';
import {useToast} from 'react-native-toast-notifications';

const ChangeProfileScreen = ({navigation,route}) => {
    const {user} = useSelector(state => state.auth)
    const [isLoading,setIsLoading] = React.useState(false)
    const [name,setName] = React.useState(user.name)
    const [avatar,setAvatar] = React.useState()
    const [email,setEmail] = React.useState(user.email)
    const [phoneNumber,setPhoneNumber] = React.useState(user.phoneNumber)
    const [remove,setRemove] = React.useState(0)
    const dispatch = useDispatch();
    const toast = useToast()

    const handleAddImage = async()=>{
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });
        if (!result.canceled) {
            setAvatar(result.uri)
            setRemove(0)
        }
    }

    const handleDeleteImage = () =>{
        if (avatar) setAvatar(null)
        else setRemove(1)
    }
    const handleChangeProfile = () => {
        setIsLoading(true)
        if (avatar){
            let localUri = avatar;
            let filename = localUri.split('/').pop();
          
            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            dispatch(
                changeProfile({
                    name:name,
                    email:email,
                    phoneNumber: phoneNumber,
                    photos:{ uri: localUri, name: filename, type },
                })
            )
            toast.hideAll();
            toast.show(
                <WToast 
                    content={"Cập nhập thành công!"} 
                    showTouch={false}
                    iconStyle={{
                        width:24,
                        height:24,
                        marginRight:15,
                        marginTop:5
                    }}
                    icon={require('../../../assets/icons/success_icon.png')}
                />
                ,{
                    type:'custom_type'
                }
            );
            setIsLoading(false)
        }else{
            dispatch(
                changeProfile({
                    name:name,
                    email:email,
                    phoneNumber: phoneNumber,
                })
            )
            setIsLoading(false)
        }
    }

    return (
        <View style={{flex:1}}>
            <Header onGoBack={()=>navigation.goBack()} title='Cập nhật thông tin'/>
            <ScrollView style={styles.scrollView}>
                <View style={styles.avatar}>
                    <Text style={styles.avatar_title}>Hình ảnh</Text>
                    <View style={styles.avatar_group}>
                        {
                            avatar ? (
                                <Image 
                                    source={{uri:avatar}}
                                    style={styles.avatar_image}
                                />
                            ):(
                                <>
                                    {
                                        remove == 1 ? (
                                            <Image 
                                                source={require('../../../assets/images/DefaultAvatar.jpg')}
                                                style={styles.avatar_image}
                                            />
                                        ):(
                                            <Image 
                                                source={{uri:(BASE_URL+user.profilePicture)}}
                                                style={styles.avatar_image}
                                            />
                                        )
                                    }
                                
                                </>
                            )
                        }
                        <View style={styles.avatar_event_group}>
                            <TouchableOpacity 
                                style={[styles.avatar_event,{marginBottom:20}]}
                                onPress={handleAddImage}
                            >
                                <Image 
                                    source={require('../../../assets/icons/ChangeIcon.png')}
                                    style={{
                                        width:14,
                                        height:14,
                                    }}
                                />
                                <Text style={[styles.avatar_event_text,{color:'#126FAF'}]}>Tải lại</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity 
                                style={styles.avatar_event}
                                onPress={handleDeleteImage}
                            >
                                <Image 
                                    source={require('../../../assets/icons/delete_icon.png')}
                                    style={{
                                        width:14,
                                        height:14,
                                    }}
                                />
                                <Text style={[styles.avatar_event_text,{color:'#394B6A',opacity:0.7}]}>Xóa</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </View>
                <View>
                    <WTextInput
                        label={'Họ và tên'}
                        text={name}
                        setText={text => setName(text)}
                        group_style={styles.text_input_style}
                        onBlur={()=>{}}
                    />
                    <WTextInput 
                        label={'Email'}
                        text={email}
                        setText={text => setEmail(text)}
                        group_style={styles.text_input_style}
                        onBlur={()=>{}}
                    />
                    <WTextInput 
                        label={'Số điện thoại'}
                        text={phoneNumber}
                        setText={text => setPhoneNumber(text)}
                        group_style={styles.text_input_style}
                        keyboardType="phone-pad"
                        onBlur={()=>{}}
                    />
                </View>
            </ScrollView>
            <Footer 
                buttonOkContent={'Lưu'}
                onClickButtonOk={handleChangeProfile}
                footer_style={styles.footer_style}
                disabled={isLoading}
                loading={isLoading}
            />
        </View>
    )
}

export default ChangeProfileScreen

const styles = StyleSheet.create({
    scrollView:{
        flex:1,
        backgroundColor:'#FFFFFF',
        paddingHorizontal:15,
    },
    avatar:{
        paddingVertical:30,
        borderBottomColor:'#E1E9F6',
        borderBottomWidth:1
    },
    avatar_title:{
        fontSize:11,
        lineHeight:16,
        fontWeight:'600',
        color:'#394B6A',
        opacity:0.7,
        textTransform:'uppercase',
        marginBottom:10,
    },
    avatar_group:{
        flexDirection:'row',
        alignItems:'center'
    },
    avatar_image:{
        width:80,
        height:80,
        borderRadius:6
    },
    avatar_event_group:{
        marginLeft:20,
    },
    avatar_event:{
        flexDirection:'row',
        alignItems:'center',
    },
    avatar_event_text:{
        fontSize:11,
        lineHeight:16,
        fontWeight:'600',
        marginLeft:10
    },
    text_input_style:{
        paddingTop:30,
    },
    footer_style:{
        backgroundColor:'#FFFFFF'
    },
    label_style:{
        color:'#394B6A',
        fontSize:11,
        lineHeight:16,
        fontWeight:'600',
        textTransform:'uppercase',
        opacity:0.7,
    },
    input_style:{
        paddingVertical:10,
        borderBottomColor:'#E1E9F6',
        borderBottomWidth:1,
        borderStyle:'solid',
        fontSize:14,
        fontWeight:'600',
        color:'#2C3442',
        opacity:0.5,
    }
})
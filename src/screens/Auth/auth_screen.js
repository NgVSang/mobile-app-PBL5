import { StyleSheet, Text, View ,Dimensions,TouchableOpacity,Image,KeyboardAvoidingView} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import SlidingUpPanel from 'rn-sliding-up-panel';
import {useDispatch} from 'react-redux';
import Login from '../../screenComponent/Login';


const { width, height } = Dimensions.get('window');
const AuthScreen = ({navigation}) => {
    const show = React.useRef();
    const dispatch = useDispatch();
    const [toggle,setToggle] = React.useState()

    const showLoginForm = ()=>{
        setToggle(!toggle)
    }

    React.useEffect(()=>{
        return ()=> show.current.show();
    },[toggle])

    React.useEffect(()=>{
        // dispatch(clearToken());
    },[])
    return (           
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={{flex:1}}
        >
            <View style={{flex:1}}>
                <LinearGradient 
                    colors={[ '#1C1F2366','#0A254E']}
                    style={styles.container}
                />   
                <Image 
                    style={styles.img_back}
                    source={require('../../assets/images/background_image.jpg')}
                /> 
                <View style={styles.group}>
                    <View style={styles.title}>
                        <Text style={styles.title_top}>Ứng dụng quản lý nhân viên</Text>
                        <Text style={styles.title_bot}>Kiểm tra tiền công việc mọi lúc</Text>
                    </View>
                    <View style={styles.btn_group}>
                        <TouchableOpacity 
                            style={styles.btn_login}
                            onPress={()=>showLoginForm()}
                        >
                            <Text style={[styles.btn_style,{color:'#FFFFFF'}]}>ĐĂNG NHẬP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <SlidingUpPanel 
                    ref={show}
                    draggableRange={{top: height*0.65, bottom: 0}}
                    height={height*0.65}
                    allowMomentum={true}
                    allowDragging={false}
                    avoidKeyboard={true}
                    backdropStyle={{
                        backgroundColor:null,
                    }}
                >
                    <Login />
                </SlidingUpPanel>
            </View>
        </KeyboardAvoidingView>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    img_back:{
        resizeMode:'cover',
        zIndex:-1,
        width:'100%',
    },
    container:{
        width:"100%",
        height:"100%",
        position:'absolute',

    },
    group:{
        position:'absolute',
        width:'100%',
        bottom:70,
    },
    title:{
        paddingHorizontal:61,
        marginBottom:55
    },
    title_top:{
        fontSize:36,
        fontWeight:'700',
        lineHeight:54,
        letterSpacing:0.2,
        color:'#FFFFFF',
        textAlign:'center'
    },
    title_bot:{
        fontSize:12,
        fontWeight:'400',
        lineHeight:20,
        color:'#FFFFFF',
        textAlign:'center'
    },
    btn_group:{
        paddingHorizontal:90
    },
    btn_login:{
        width:'100%',
        height:40,
        borderRadius:24,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20,
        backgroundColor:'#3C61EA',
        shadowColor: '#0000001F',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    btn_register:{
        width:'100%',
        height:40,
        borderRadius:24,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFFFFF',
        shadowColor: '#0000001F',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    btn_style:{
        fontWeight:'700',
        fontSize:13,
        lineHeight:22
    },
    slidingPanelLayoutStyle: {
        backgroundColor: '#FFFFFF', 
        justifyContent: 'center', 
        alignItems: 'center',
        width:360,
        height:300,
        zIndex:10,
    },
})
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import WTextInput from '../components/WTextInput';
import WDropDownPicker from '../components/WDropDownPicker';
import WSelectInput from '../components/WSelectInput';
import {useToast} from 'react-native-toast-notifications';
import WToast from '../components/WToast';
import {useDispatch, useSelector} from 'react-redux';
import {save_history} from '../store/actions';
import Header from '../components/layout/Header';

const MainScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const dropdown = [
        {
            id: 1,
            name: "count-letter-digit",
            value: 1,
        },
        {
            id: 2,
            name: "remove-even",
            value: 2,
        },
    ]
    const toast = useToast();
    const [select,setSelect] = React.useState()
    const [ans,setAns] = React.useState('')
    
    const [input, setInput] = React.useState('')

    const handleSubmit = () => {
        if (select && input != ''){
            if ( select == 1){
                var letter = 0;
                var number = 0;
                for ( let i = 0 ; i< input.length ; i++ ){
                    var value = input[i].charCodeAt()
                    // console.log(value);
                    if ((65 <= value && value <= 90) || ( 97 <= value && value <= 122 ) ){
                        letter ++;
                    }
                    if (48 <= value && value <= 57 ){
                        number ++;
                    }
                }
                let answer = "LETTERS: " + letter.toString() + ", DIGITS: " + number.toString();
                dispatch(save_history({
                    input: input,
                    action: select == '1' ? "count-letter-digit" : "remove-even",
                    result: answer
                }));
                setAns(answer)
            }
            if ( select == 2 ){
                var arr = input.split(",")
                var result = ""
                for (let i = 0 ; i< arr.length ; i++ ){
                    if ( parseInt(arr[i]) % 2 == 1 ){
                        result += arr[i] + ','
                    }
                }
                result = result.substring(0,result.length - 1)
                dispatch(save_history({
                    input: input,
                    action: select == '1' ? "count-letter-digit" : "remove-even",
                    result: result
                }));
                setAns(result)
            }
        }else{
            toast.hideAll();
            toast.show(
                <WToast 
                    content={"Vui lòng nhập đủ trường"} 
                    showTouch={false}
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
        }
    }

    return (
        <View style={{flex:1}}>
            <Header onGoBack={()=>{}} title="Trang chủ" showBtnGoback={false}/>
            <View style={styles.container}>
                <Text style={styles.title}>Nguyễn Viết Sáng</Text>
                <WTextInput 
                    group_style={styles.input}
                    label="Input"
                    text={input}
                    setText={setInput}
                />
                <WSelectInput 
                    label={"Action"}
                    dataSelect={dropdown}
                    select_style={styles.input}
                    onSelect={(id)=>{
                        setSelect(id)
                    }}
                    value={select}
                />
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={{color:'#fff'}}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.output}>
                    <Text>Output:</Text>
                    <Text>{ans}</Text>
                </View>
                <TouchableOpacity 
                    style={styles.history}
                    onPress={()=>{
                        navigation.push("/history")
                    }}
                >
                    
                    <Image 
                        source={require('../assets/icons/history_icon.png')}
                        style={{
                            width:32,
                            height:32,
                            resizeMode:'contain'
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:20,
        backgroundColor:"#fff"
    },
    input:{
        marginTop:30
    },
    buttonWrapper:{
        alignItems:'center',
        marginTop:30
    },
    button:{
        height:40,
        width:200,
        borderRadius:24,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#0F6AA9',
    },
    output:{
        marginTop:30
    },
    title:{
        textAlign:'center',
        fontSize:30,
        fontWeight:"500",
        marginTop:30
    },
    history:{
        marginLeft:100,
        marginTop:100,
        backgroundColor:'#fff',
    }
})
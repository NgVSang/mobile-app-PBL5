import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../../components/layout/Header'
import WSelectInput from '../../../components/WSelectInput'
import {useSelector} from 'react-redux'
import requestService from '../../../services/api/request/RequestService'
import WTextInput from '../../../components/WTextInput'
import dayjs from 'dayjs'
import WTimeInput from '../../../components/WTimeInput'
import Footer from '../../../components/layout/Footer'
import {convertDate} from '../../../services/utils'
import WToast from '../../../components/WToast'
import {useToast} from 'react-native-toast-notifications'
import { CommonActions } from '@react-navigation/native';

const RequestScreen = ({navigation,route}) => {
  const {user,token} = useSelector(state => state.auth)
  const toast = useToast();
  const [isLoading,setIsLoading] = React.useState(true)
  const [listTypeRequest, setListTypeRequest] = React.useState()
  const [body,setBody] = React.useState("")
  const [date,setDate] = React.useState("")
  const [startTime,setStartTime] = React.useState("")
  const [endTime,setEndTime] = React.useState("")
  const [typeSelect, setTypeSelect] = React.useState()

  React.useEffect(()=>{
    if (token){
      requestService.get_request_type()
      .then((res)=>{
        console.log(res.data);
        setListTypeRequest(res.data.type)
      })
      .catch((err)=>{
        alert(err.message)
      })
    }
  },[token])

  const handleSubmit = () =>{
    const dataSent = {
      type : typeSelect,
      endTime,
      startTime,
      date: convertDate(date),
      body,
    }
    console.log(dataSent);
    requestService.create_request(dataSent)
    .then((res)=>{
      toast.hideAll();
      console.log(res);
      toast.show(
        <WToast 
          content={"Tạo thành công!"} 
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
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: '/user' },
            {
              name: '/user/request',
            },
          ],
        })
      )
    })
    .catch((err)=>{
      alert(err.message)
    })
  }

  return (
    <View style={{flex:1}}>
      <Header onGoBack={()=>navigation.goBack()} title='Request'/>
      <ScrollView style={styles.scroll_view}>
        <View style={styles.container}>
          <WSelectInput 
            dataSelect={listTypeRequest}
            label='Thể loại'
            // select_style={styles.input_style}
            onSelect={(type)=>setTypeSelect(type)}
          />
          <WTextInput 
            label={'Nội dung'}
            text={body}
            setText={text => setBody(text)}
            group_style={styles.text_input_style}
            onBlur={()=>{}}
          />
          <WTimeInput 
            label='Ngày' 
            group_style={styles.text_input_style}
            setText={(text)=>setDate(text)}
            text={date}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            placeholder={"Ví dụ: 25/04/2023"}
          />
          <WTimeInput 
            label='Giời gian bắt đầu' 
            group_style={styles.text_input_style}
            setText={(text)=>setStartTime(text)}
            text={startTime}
            type={'datetime'}
            options={{
              format: 'HH:mm',
            }}
            placeholder={"Ví dụ: 09:00"}
          />
          <WTimeInput 
            label='Giời gian kết thúc' 
            group_style={styles.text_input_style}
            setText={(text)=>setEndTime(text)}
            text={endTime}
            type={'datetime'}
            options={{
              format: 'HH:mm',
            }}
            placeholder={"Ví dụ: 09:00"}
          />
        </View>
      </ScrollView>
      <Footer 
        buttonOkContent={"TẠO"}
        onClickButtonOk={handleSubmit}
      />
    </View>
  )
}

export default RequestScreen

const styles = StyleSheet.create({
  scroll_view:{
    backgroundColor:'#F7FAFF',
    flex:1,
  },
  container:{
    padding: 20,
    display:"flex"
  },
  text_input_style:{
    paddingTop:30,
  },
  // month_select:{
  //   display:'flex',
  //   paddingHorizontal:15,
  //   paddingVertical:10,
  // }
})
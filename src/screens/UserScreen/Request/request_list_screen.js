import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import {useSelector} from 'react-redux'
import requestService from '../../../services/api/request/RequestService'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import WRequest from '../../../components/WRequest'

const RequestListScreen = ({navigation,route}) => {
    const { user, token } = useSelector(state => state.auth)
    const [ requests, setRequests ] = React.useState()

    React.useEffect(()=>{
        if (token){
            requestService.get_request_list()
            .then((res)=>{
                console.log(res.data.requests);
                setRequests(res.data.requests)
            })
            .catch((error)=>{
                alert(error.message)
            })
        }
    },[token])
    return (
        <View style={{flex:1}}>
            <Header onGoBack={()=>{navigation.goBack()}} title='Danh sách Request'/>
            <ScrollView style={styles.scroll_view}>
                {
                    requests?.map((request)=>(
                        <WRequest 
                            request={request}
                            key={request._id}
                        />
                    ))
                }
            </ScrollView>
            <Footer 
                buttonOkContent={'Tạo request'}
                onClickButtonOk={()=>{
                    navigation.push('/user/request/add')
                }}
                footer_style={styles.footer_style}
            />
        </View>
    )
}

export default RequestListScreen

const styles = StyleSheet.create({
    scroll_view:{
        backgroundColor:'#F7FAFF',
        flex:1,
        paddingHorizontal: 20,
        paddingBottom:100,
    },
    footer_style:{
        backgroundColor:'#FFFFFF'
    },
})
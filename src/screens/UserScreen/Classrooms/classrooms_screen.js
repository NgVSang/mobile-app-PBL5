import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import classroomService from '../../../services/api/classroom/ClassService'
import {useSelector} from 'react-redux'
import Header from '../../../components/layout/Header'
import Loading from '../../../components/Loading'
import WClass from '../../../components/WRequest'
import {setHeaderConfigAxios} from '../../../services/https/apiConfig'

const ClassroomsScreen = ({navigation,route}) => {
    const [loading, setLoading] = React.useState(false)
    const [ data, setData ] = React.useState()
    const {token} = useSelector(state => state.auth)
    React.useEffect(()=>{
        if (token){
            console.log(token);
            // setHeaderConfigAxios(token);
            setLoading(true)
            classroomService.get_classrooms()
            .then((res)=>{
                setLoading(false)
                setData(res.data.classrooms)
            })
            .catch((error)=>{
                setLoading(false)
                console.log("Error: ",error);
            })
        }
    },[token])
    console.log(data);

    return (
        <View style={{flex:1}}>
            <Header 
                onGoBack={()=>navigation.goBack()} 
                title='Danh sách lớp'
            />
            {
                loading ? (
                    <Loading />
                ):(
                    <ScrollView style={styles.scroll_view}>
                        {
                            data?.map((classInfo, index) => (
                                <WClass 
                                    classInfo={classInfo}
                                    key={index}
                                />
                            ))
                        }
                        {/* <WClass 
                            classInfo={}
                        /> */}
                    </ScrollView>
                )
            }
        </View>
    )
}

export default ClassroomsScreen

const styles = StyleSheet.create({
    scroll_view :{
        flex:1 ,
        backgroundColor:'#F7FAFF',
        paddingHorizontal: 15,
    }
})
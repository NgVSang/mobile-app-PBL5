import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../../components/layout/Header'
import dayjs from 'dayjs'
import {formatDate} from '../../../services/utils'
import WClass from '../../../components/WRequest'

const ClassInDate = ({navigation,route}) => {
    const {day} = route.params
    return (
        <View style={{flex:1}}>
            <Header 
                onGoBack={()=>navigation.goBack()} 
                title='Lịch dạy học hôm nay'
            />
            <ScrollView style={{flex:1 ,backgroundColor:'#F7FAFF'}}>
                <View style={styles.content}>
                    <Text style={styles.content_title}>
                        {
                            dayjs(day.dateString).day() == 0 ?
                            'Chủ nhật' : 'Thứ ' + (dayjs(day.dateString).day() + 1)
                        } 
                        , ngày {formatDate(day.dateString)}
                    </Text>
                    <WClass 
                        classInfo={{
                            id: 1,
                            name:"Toán",
                            studentCount:28,
                            time:"17h30 - 19h00"
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default ClassInDate

const styles = StyleSheet.create({
    content:{
        paddingHorizontal:15,
        paddingTop:25
    },
    content_title:{
        fontSize:16,
        lineHeight:20,
        fontWeight:'700',
        color:'#394B6A',
        textTransform:'uppercase',
        marginBottom:15
    },
})
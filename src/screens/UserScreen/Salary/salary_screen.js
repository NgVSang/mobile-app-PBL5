import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, {useCallback, useMemo, useState} from 'react'
import Header from '../../../components/layout/Header'
import dayjs from 'dayjs'
import {convertPrice} from '../../../services/utils'
import WSelectInput from '../../../components/WSelectInput'

const SalaryScreen = ({navigation}) => {
    const now = new Date()
    const [month, setMonth] = useState();

    const listMonth = useMemo(()=>{
        const current_year = now.getFullYear()
        const current_month = now.getMonth()
        let listMonth=[]
        for ( let j = current_month+1 ; j>=1 ;j --){
            listMonth.push({
                id: j.toString() + '/' + current_year.toString(),
                name:j.toString() + '/' + current_year.toString()
            })
        }
        for (let i=current_year - 1;i>=2020;i--){
            for ( let j = 12 ; j>=1 ;j --){
                listMonth.push({
                    id: j.toString() + '/' + i.toString(),
                    name:j.toString() + '/' + i.toString()
                })
            }
        }
        return listMonth
    },[now])

    console.log(listMonth);

    return (
        <View style={{flex:1}}>
            <Header onGoBack={()=>navigation.goBack()} title='Bảng lương'/>
            <ScrollView style={styles.scroll_view}>
                <View style={styles.month_select}>
                    <View>
                        <WSelectInput 
                            dataSelect={listMonth}
                            label='Tháng'
                            defaultValueByIndex={0}
                            select_style={styles.input_style}
                            onSelect={(month)=>setMonth(month)}
                        />
                    </View>
                    <View>
                        <Text>Tổng tiền: {convertPrice(15000000)}đ</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default SalaryScreen

const styles = StyleSheet.create({
    scroll_view:{
        backgroundColor:'#F7FAFF',
        flex:1,
    },
    month_select:{
        display:'flex',
        paddingHorizontal:15,
        paddingVertical:10,
    }
})
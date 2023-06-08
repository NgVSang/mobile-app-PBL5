import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useMemo, useState} from 'react'
import Header from '../../../components/layout/Header'
import dayjs from 'dayjs'
import {convertPrice} from '../../../services/utils'
import WSelectInput from '../../../components/WSelectInput'
import {useSelector} from 'react-redux'
import salaryService from '../../../services/api/salary/SalaryService'
import Loading from '../../../components/Loading'

const SalaryScreen = ({navigation}) => {
    const now = new Date()
    const {user,token} = useSelector(state => state.auth)
    const [month,setMonth] = React.useState(dayjs(now).format("YYYY-MM"))
    const [isLoading,setIsLoading] = React.useState(true)
    const [data, setData] = useState();

    const listMonth = useMemo(()=>{
        const current_year = now.getFullYear()
        const current_month = now.getMonth()
        let listMonth=[]
        for ( let j = current_month+1 ; j>=1 ;j --){
            listMonth.push({
                _id: current_year.toString()+ '-' + (j.toString().length > 1 ? j.toString() : '0' + j.toString()),
                name:j.toString() + '/' + current_year.toString()
            })
        }
        for (let i=current_year - 1;i>=2020;i--){
            for ( let j = 12 ; j>=1 ;j --){
                listMonth.push({
                    _id: i.toString()+ '-'+ (j.toString().length > 1 ? j.toString() : '0' + j.toString()),
                    name:j.toString() + '/' + i.toString()
                })
            }
        }
        return listMonth
    },[now])

    React.useEffect(()=>{
        if (token){
            setIsLoading(true)
            console.log(month);
            salaryService.get_salary(month)
            .then((res)=>{
                console.log(res.data);
                setData(res.data.payroll)
                setIsLoading(false)
            })
            .catch((error)=>{
                setIsLoading(false)
                alert(error.message)
            })
        }
    },[month])

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
                    {
                        isLoading == true ? (
                            <Loading />
                        ):(
                            <View>
                                {
                                    data ? (
                                        <View style={styles.salary_box}>
                                            <Text>Lương cơ bản: {convertPrice(data.baseSalary)}đ</Text>
                                            <Text>Thưởng: {convertPrice(data.bonus)}đ</Text>
                                            <Text>Phạt: {convertPrice(data.fined)}đ</Text>
                                            <Text>Thực nhận: {convertPrice(data.totalAmount)}đ</Text>
                                        </View>
                                    ):(<Text>Chưa có dữ liệu</Text>)
                                }
                            </View>
                        )
                    }
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
        paddingHorizontal:15,
        paddingBottom: 30,
    },
    month_select:{
        paddingTop: 20
    },
    salary_box:{
        display:'flex',
        alignItems:'center',
        paddingVertical: 20,
        paddingHorizontal:15,
        borderRadius:6,
        shadowColor: '#0000000D',
        shadowOffset: {width: 2, height: 8},
        shadowOpacity: 0,
        shadowRadius: 0,
        backgroundColor:'#FFFFFF',
        marginTop:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    group_content:{
        marginTop: 10,
        display:'flex',
        flexDirection: 'row',
        alignItems:'flex-end'
    },
    group_title:{
        fontSize:13,
        lineHeight:24,
        color:'#394B6A',
        fontWeight:'400',
    },
    group_main:{
        fontSize:17,
        fontWeight:'500',
        lineHeight:24,
        color:'#2E333D',
    }
})
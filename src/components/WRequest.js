import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React from 'react'
import dayjs from 'dayjs'; // Đường dẫn đúng đến thư viện Day.js
import 'dayjs/locale/vi'; // Import locale tiếng Việt của Day.js
import {convertDate, formatDate} from '../services/utils';
dayjs.locale('vi');

const WRequest = ({request}) => {

    return (
    <View style={styles.component}>
        {/* <View style={styles.image_wrapper}>
            {renderIcon(classInfo?.name)}
        </View> */}
        <View style={{display:'flex',flex:1}}>
            <View style={styles.header}>
                <View style={styles.header_subject}>
                    {/* <Text style={styles.header_label}>Môn: </Text> */}
                    <Text style={styles.header_content}>{request?.type?.name}</Text>
                </View>
                {
                    request?.date ? (
                        <View style={styles.header_id}>
                            <Text style={styles.header_label}>Ngày: </Text>
                            <Text style={styles.header_content}>{formatDate(request?.date)}</Text>
                        </View>
                    ):(<></>)
                }
            </View>
            <View style={styles.container}>
                <Text style={styles.content_label}>Nội dung: </Text>
                <Text style={styles.content_styled}>{request?.body}</Text>
            </View>
            {
                request?.startTime ? (
                    <View style={styles.container}>
                        <Text style={styles.content_label}>Bắt đầu: </Text>
                        <Text style={styles.content_styled}>{request?.startTime}</Text>
                    </View>
                ):(
                    <></>
                )
            }
            {
                request?.endTime ? (
                    <View style={styles.container}>
                        <Text style={styles.content_label}>Kết thúc: </Text>
                        <Text style={styles.content_styled}>{request?.endTime}</Text>
                    </View>
                ):(
                    <></>
                )
            }
            <View style={styles.container}>
                <Text style={styles.content_label}>Trạng thái: </Text>
                <Text style={styles.content_styled}>
                    {
                        request?.status == 1 ? "Đang chờ duyệt" : 
                        request?.status == 0 ? "Bị từ chối" : "Được duyệt"
                    }
                </Text>
            </View>
        </View>
    </View>
  )
}

export default WRequest

const styles = StyleSheet.create({
    component:{
        marginVertical:5,
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:6,
        backgroundColor:'#FFF',
        flexDirection:'row',
        display:'flex',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image_wrapper:{

    },
    container:{
        display:"flex",
        flexDirection:'row',
        alignItems:'flex-start',
        marginLeft: 8,
        flex:1
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:8,
        flex:1
    },
    header_subject:{
        flexDirection:'row',
        paddingHorizontal:8,
        paddingVertical:6,
        // borderRadius:6,
        // backgroundColor:'#445dad',
    },
    header_id:{
        flexDirection:'row',
        paddingHorizontal:8,
        paddingVertical:6,
        borderRadius:6,
        // backgroundColor:'#ff6c02',
    },
    header_label:{
        // color:"#",
        fontSize:16,
        lineHeight:20,
        fontWeight:'400',
    },
    header_content:{
        // color:"#fff",
        fontSize:16,
        lineHeight:20,
        fontWeight:'600',
        textTransform:'uppercase',
    },
    content_label:{
        fontSize:12,
        display:'flex',
        lineHeight:18,
        fontWeight:'400',
    },
    content_styled:{
        fontSize:14,
        lineHeight:20,
        fontWeight:'600',
        display:'flex',
        flex:1
    },
    content_styled_row:{
        fontSize:14,
        lineHeight:20,
        fontWeight:'600',
    },
})
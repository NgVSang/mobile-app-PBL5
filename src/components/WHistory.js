import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import WModal from './WModal'
import {useDispatch} from 'react-redux';

const WHistory = ({
  history,
}) => {
  const [visible,setVisible] = React.useState(false);
  const dispatch = useDispatch();

  const closeModal = () =>{
    setVisible(false);
  }

  const handleDelete = () => {
    console.log("ok");
    // dispatch(delete_all_history())
    setVisible(false);
  }

  return (
    <View style={styles.history}>
      <View>
        <Text>Input: {history.input}</Text>
        <Text>Action: {history.action}</Text>
        <Text>Result: {history.result}</Text>
      </View>
      <TouchableOpacity onPress={()=>{
        setVisible(true)
      }}>
        <Image 
            source={require('../assets/icons/delete_icon.png')}
            style={{
                height:20,
                width:15,
            }}
        />
      </TouchableOpacity>
      <WModal 
        modalVisible={visible}
        closeModal={closeModal}
        handleConfirm={handleDelete}
        modalContent="Bạn có muốn xóa lịch sử này không ? "
      />
    </View>
  )
}

export default WHistory

const styles = StyleSheet.create({
  history:{
    paddingHorizontal:15,
    paddingVertical: 20,
    borderWidth:1,
    borderColor:'#0F6AA9',
    borderRadius:6,
    marginTop:15,
    justifyContent:"space-between",
    alignItems:'center',
    flexDirection:'row'
  },
  history_left:{
    // width:'80%',
  },
  history_right:{
    // width:'20%',
  },
})
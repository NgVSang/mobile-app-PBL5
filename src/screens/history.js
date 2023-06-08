import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import WHistory from '../components/WHistory';
import Header from '../components/layout/Header';
import {delete_all_history} from '../store/actions';
import WModal from '../components/WModal';

const History = ({navigation}) => {
  const {history} = useSelector((state) => state.auth);
  const [visible,setVisible] = React.useState(false);
  const dispatch = useDispatch();

  const closeModal = () =>{
    setVisible(false);
  }

  const handleDeleteAll = () => {
    console.log("ok");
    dispatch(delete_all_history())
    setVisible(false);
  }

  // console.log("history",history);
  return (
    <View style={{flex:1}}>
      <Header onGoBack={()=>{navigation.goBack()}} title="Lịch sử" showBtnGoback={true} 
        deleteAll={()=>{
          setVisible(true)
        }}
      />
      <ScrollView style={styles.container}>
        {
          history?.map((h,index)=>(
            <WHistory 
              history={h}
              key={h.id}
            />
          ))
        }
      </ScrollView>
      <WModal 
        modalVisible={visible}
        closeModal={closeModal}
        handleConfirm={handleDeleteAll}
        modalContent="Bạn có muốn xóa toàn bộ lịch sử không ? "
      />
    </View>
  )
}

export default History

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:15
  }
})
import React, { useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { StyleSheet } from 'react-native';
import dayjs from 'dayjs'
const DateTimePicker = ({
  isVisible,
  setVisible,
  date,
  setDate
}) => {
  const hideDatePicker = () => {
    setVisible()
  };

  const handleConfirm = (currentDate) => {
    hideDatePicker();
    setDate(dayjs(currentDate).format('YYYY-MM-DD'))
  };
  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode="date"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      date={dayjs(date).toDate()}
    />
  );
}

export default DateTimePicker

const styles = StyleSheet.create({})
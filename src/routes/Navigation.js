import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationService from '../services/NavigationService';
import React, {useEffect} from 'react'
import UserBottom from './UserBottom';
import AuthScreen from '../screens/Auth/auth_screen';
import {useDispatch, useSelector} from 'react-redux';
import ClassInDate from '../screens/UserScreen/CourseManager/class_date_screen';
import AdminBottom from './AdminBottom';
import ClassroomsScreen from '../screens/UserScreen/Classrooms/classrooms_screen';
import {setHeaderConfigAxios} from '../services/https/apiConfig';
import RequestScreen from '../screens/UserScreen/Request/request_screen';
import ChangeProfileScreen from '../screens/UserScreen/Home/profile_update_screen';
import ChangePasswordScreen from '../screens/UserScreen/Home/change_password_screen';
import RequestListScreen from '../screens/UserScreen/Request/request_list_screen';
import SalaryScreen from '../screens/UserScreen/Home/salary_screen';


const Stack = createNativeStackNavigator()
const Navigation = () => {
  const {token} = useSelector(state => state.auth)
  
  return (
    <NavigationContainer ref={ref => NavigationService.setTopLevelNavigator(ref)}>
      <Stack.Navigator 
        initialRouteName={
          (token && token != "") ? "/user" : "/auth"  
        }
      >   
        <Stack.Screen 
          name="/user" 
          component={UserBottom} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="/admin" 
          component={AdminBottom} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="/auth" 
          component={AuthScreen} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="/user/request/add" 
          component={RequestScreen} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="/user/class/date" 
          component={ClassInDate} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="/user/class" 
          component={ClassroomsScreen} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="/user/profile/update" 
          component={ChangeProfileScreen} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="/user/change-password" 
          component={ChangePasswordScreen} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="/user/request" 
          component={RequestListScreen} 
          options={{ 
            headerShown: false 
          }}
        />
        <Stack.Screen 
          name="/user/salary" 
          component={SalaryScreen} 
          options={{ 
            headerShown: false 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})
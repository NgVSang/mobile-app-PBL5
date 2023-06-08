import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/routes/Navigation';
import { ToastProvider } from 'react-native-toast-notifications'
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/store';
import { Provider as ModalProvider} from 'react-native-paper';
import * as SplashScreen from "expo-splash-screen";
import React, {useCallback, useEffect} from 'react';
import {PersistGate} from 'redux-persist/integration/react';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setHeaderConfigAxios} from './src/services/https/apiConfig';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = React.useState('');
  const notificationListener = React.useRef();
  const [isLoadingComplete, setIsLoadingComplete] = React.useState(false);
  const responseListener = React.useRef();

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        convertAlert('Thông báo',"Vui lòng cho phép thông báo trong phần cài đặt để nhận được những thông báo mới nhất từ SMARTEST!");
        await AsyncStorage.setItem('push_token',"Null token")
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      await AsyncStorage.setItem('push_token',token)
      console.log("token:",token);
    } else {
      convertAlert('Thông báo','Phải là điện thoại thật thì mới gửi được thông báo');
    }
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    console.log("token:",token);
    return token;
  }

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoadingComplete(true);
      }
    }
    const setHeader = async ()=>{
      let access_token = await AsyncStorage.getItem("access_token");
      setHeaderConfigAxios(access_token);
    }

    prepare();
    setHeader();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isLoadingComplete) {
      await SplashScreen.hideAsync();
    }
  }, [isLoadingComplete]);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      // setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ModalProvider>
            <ToastProvider
              renderType={{
                custom_type: (toast) => (
                  <>
                    {
                      toast.message
                    }
                  </>
                )
              }}
              placement="top"
              offsetTop={30}
            >
              <Navigation />
            </ToastProvider>
          </ModalProvider>
        </PersistGate>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

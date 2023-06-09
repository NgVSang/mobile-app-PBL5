import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducer from './reducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, reducer)

let store = createStore(persistedReducer,applyMiddleware(thunk))
let persistor = persistStore(store)
export { store, persistor }
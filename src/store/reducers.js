import { 
  SAVE_HISTORY, 
  DELETE_ALL_HISTORY, 
  DELETE_HISTORY,
  LOGIN,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  CHANGE_PROFILE,
  CHANGE_PROFILE_SUCCESS,
  CHANGE_PROFILE_FAILED,
 } from './actions';

export const initialState = {
  user:{},
  token:"",
  loading:false,
};

export function appReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading:true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.access_token,
        user: action.payload.info,
        loading: false,
      }
    case LOGIN_FAILED:
      return {
        ...state,
        loading:false,
      }
    case LOGOUT:
      return {
        ...state,
        user:{},
        token:""
      };
    case SAVE_HISTORY:
      return {
        ...state,
        history: [...state.history, {
          id: state.recentId,
          input: action.payload.input,
          action: action.payload.action,
          result: action.payload.result,
        }],
        recentId: state.recentId + 1,
      };
    case DELETE_HISTORY:
      return {
        ...state,
        history: state.history.filter((h)=>h != action.payload)
      };
    case DELETE_ALL_HISTORY:
      return {
        ...state,
        history:[],
        recentId: 1,
      };
    case CHANGE_PROFILE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    default:
      return state;
  }
}

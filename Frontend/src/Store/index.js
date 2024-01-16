import { createSlice, configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const authSlice = createSlice({
  name : "auth",
  initialState : {isLoggedIn : false},
  reducers : {
    login(state){
      state.isLoggedIn = true
    },
    logout(state){
      localStorage.removeItem('userId');
      state.isLoggedIn = false
    }
  }
})

export const authActions = authSlice.actions;




const rootReducer = combineReducers({
  auth: authSlice.reducer
});

/*const reducer = combineReducers({
  authSlice.reducer,
  themeSlice.reducer
})*/
export const store = configureStore({
  reducer : rootReducer
})
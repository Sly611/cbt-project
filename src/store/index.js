import { createSlice, configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "questions"]
};


const userAuthSlice = createSlice({
  name: "userSlice",
  initialState: { user: {}, is_authenticated: false },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.is_authenticated = action.payload.auth;
    },
  },
});

const pageTitleSlice = createSlice({
  name: "pageTitle",
  initialState: { title: "" },
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
  },
});

const alertSlice = createSlice({
  name: "alert",
  initialState: { open: false, message: "", severity: "", duration: 0 },
  reducers: {
    setAlert(state, action) {
      state.open = action.payload.open;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.duration = action.payload.duration;
    },
    resetAlert(state) {
      state.open = false;
      state.message = "";
      state.severity = "";
      state.duration = 0;
    },
  },
});

const questionsSlice = createSlice({
  name: "questions",
  initialState: { questions: {} },
  reducers: {
    getQuestions(state, action) {
      state.questions = action.payload;
    },
  },
});



const rootReducer = combineReducers({
  user: userAuthSlice.reducer,
  title: pageTitleSlice.reducer,
  alert: alertSlice.reducer,
  questions: questionsSlice.reducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
  // {
  //   user: persistedReducer,
  //   title: pageTitleSlice.reducer,
  //   alert: alertSlice.reducer,
  //   questions: questionsSlice.reducer,
  // },
});


export const userSliceActions = userAuthSlice.actions;
export const pageTitleActions = pageTitleSlice.actions;
export const alertSliceActions = alertSlice.actions;
export const questionsSliceActions = questionsSlice.actions;

export const persistor = persistStore(store);

export default store;

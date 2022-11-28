import { configureStore } from '@reduxjs/toolkit';
import toDoReducer from './Reducers/todoSlider';
import userAuth  from './Reducers/userAuthSlice';
export default configureStore({
  reducer: {
    toDo: toDoReducer,
    user: userAuth
  }
})
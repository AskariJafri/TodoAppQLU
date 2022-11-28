import { createSlice} from '@reduxjs/toolkit'

export const toDoSlider = createSlice({
 name: 'toDo',
 initialState: {
   todoList:   [],
 },

 reducers: {
   addToDo: (state, action) => {
    
     let newTodoList = {
       id: action.payload.id,
       content: action.payload.newContent,
       status: action.payload.status,
     }
     state.todoList.push(newTodoList);
   },
   deleteToDo: (state, action) => {
     let { todoList } = state;
     state.todoList = todoList.filter((item) => 
         item.id !==action.payload.id);
   },
   editTodo: (state, action) => {
     let { todoList } = state;
     state.todoList = todoList.map((item) => 
       item.id === action.payload.id ? action.payload : item);
   },
   setAll:(state,action)=>{
    state.todoList=action.payload
   }

  }
})

export const { addToDo, deleteToDo, editTodo,setAll } = toDoSlider.actions
export default toDoSlider.reducer;
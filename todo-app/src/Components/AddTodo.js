import { useState } from "react";
import { addToDo } from "../Reducers/todoSlider";
import { useDispatch } from "react-redux";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useSelector } from "react-redux";


const AddTodo = () => {
    const dispatch = useDispatch(); // to access the dispatch function of the store
    // creating local state for the component
    const { user } = useSelector((state) => state.user);
    console.log("user data", user.userid)
    const [state, setState] = useState({
        content: '',
        status: 'pending',
        contentError: null
    });
    // define a funtion that handles changes anytime the button is clicked
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            // status: e.target.value,
            [`${e.target.name}ERROR`]: null
        });
    }
    // After all the changes are final in the input they are ready to be dispatched and this is done by clicking the add button 
    const add = () => {
        
        axios.post("http://localhost:3001/tasks", { u_id: user.userid, content: state.content, status: state.status }).then((res) => {
            console.log("post for new data", res)
            dispatch(addToDo({ newContent: content, id:res.data.id, status:"pending" }));

        })
        if (content === '') {
            setState({
                ...state,
                contentError: 'Input cannot be empty!'
            });
            return;
        }
        setState({ ...state, content: '' }); // the state of the input is rendered back to empty string after the add button is pressed
    }
    const { content, contentError } = state;

    return <div className="form">
        <h2 style={{ marginLeft: -20, fontSize: "104px" }}>Askari's todo app</h2>
        <TextField className="TextField" 
        type='text' name="content" value={content} 
        onChange={handleChange} style={{ width: 400 }} >
        </TextField>
        <button onClick={add} className='button' type='button' style={{ height: 54 }}>Add</button>
        {
            contentError ? <div className='contentError'>{contentError}</div> : null
        }
    </div>
}
export default AddTodo;
import React, { useState } from 'react';
import { AiFillEdit, AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { deleteToDo, editTodo,setAll } from '../Reducers/todoSlider';
import { useEffect } from 'react';
import Status from './Status';
import axios from 'axios'
const ListTodo = () => {
    const { todoList } = useSelector((state) => state.toDo);
    const  userId  = useSelector((state) => {
        return state.user.user.userid
    });
    console.log("Check userId", userId);

    const dispatch = useDispatch();
    const [isEditing, setEditing] = useState(false);
    const [state, setState] = useState({
        id: '', content: '', contentError: null
    });
    const onEditToggle = (id, content) => {
        setEditing(true);
        setState({ ...state, id, content });
        axios.put("http://localhost:3001/updateContent", {id:id, content:content})
        .then(()=>{console.log("updated")})
        .catch((error)=>{console.log(error)})

    }
    const handleChange = (e) => {
        setState({
            ...state, [e.target.name]: e.target.value,
            [`${e.target.name}Error`]: null
        });
    }
    const { content, contentError, id } = state;
    const edit = () => {
        if (content === '') {
            setState({ ...state, contentError: 'You must write something!' });
            return;
        }
        dispatch((editTodo({ content, id })));
        setEditing(false);
    }
    // Load user specific data whenever the page first renders
    useEffect(() => {
        //console.log(`http://localhost:3001/users/${userId}/tasks`)
        axios.get(`http://localhost:3001/users/${userId}/tasks`).then((res)=>{
        console.log([...res.data])
        dispatch(setAll([...res.data]))
       }).catch((error)=>{console.log(error)})
      },[userId]);

    const deleteHandle=(id)=>{
        dispatch(deleteToDo({id}))
        axios.post(`http://localhost:3001/deleteTask/${id}`).then((res)=>{
            console.log(res)
            
        }).catch((error)=>{console.log(error)})
    }

    return <div>
        {
            isEditing ?
                <div className='form'>
                    <input type='text' value={content} name='content'
                        onChange={handleChange}>
                    </input>
                    <button type='button' className='button'
                        onClick={edit}>Edit
                    </button>
                    {contentError ?
                        <div className='error'>{contentError}</div> : null
                    }
                </div> :
                <ul className='todos'>
                    {
                        todoList.map(({ id, content }) => {
                            return <li className='grid' key={id} style={{ borderRadius: 30 }}>
                                <span className='content'>{content}</span>

                                <span className='todo-action'>
                                    <span style={{ marginTop: -10 }}><Status id={id} /></span>
                                    <AiOutlineCloseCircle className="close"
                                        onClick={() => deleteHandle(id) }
                                    />
                                    <AiFillEdit className="edit"
                                        onClick={() => onEditToggle(id, content)}
                                    />
                                </span>
                                <span className='todo-status'></span>
                            </li>
                        })
                    }
                </ul>
        }
    </div>;
};
export default ListTodo;
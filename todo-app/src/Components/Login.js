
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux"; 
import { setUser } from '../Reducers/userAuthSlice';
import { useNavigate } from "react-router-dom";


const Login=()=>{
    
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const handleLogin =(e)=>{
        axios.post("http://localhost:3001/userAuth",{username:username,password:password}).then((res) => {
            dispatch(setUser({...res.data}))
            navigate('/todo')
        }).catch((error)=>{
            alert("Incorrect username or password")
        })
    }
   
    
    return (
        <div>
            <div style={{marginLeft:600 , float:'left',borderBlock: "solid",padding:15}}>
            <h3 style={{textAlign: 'center'}}>Login</h3>
            <label htmlFor=''>Userame</label><br></br>
            <input type="text" placeholder='username' onChange={(e)=>setUsername(e.target.value)}/><br/>
            <label htmlFor=''>Password</label><br></br>
            <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)}/><br/><br/>
            <button style={{marginLeft:120,marginBottom:30}} onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}
export default Login;
import { useState } from "react";
import axios from 'axios'

function Status({id}) {
  
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value)
    console.log(value)
    axios.put("http://localhost:3001/updateStatus", {id:id, status:event.target.value})
    
  };
  return (
    <div>
      <select value={value} onChange={handleChange} style={{background: value === "Pending"?"blue": (value === "Completed"?"green":(value==="Over Due"?"orange":"blue")), borderRadius:20,height:23}}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Over Due">Over Due</option>
      </select>
  </div>
  );
}

export default Status;

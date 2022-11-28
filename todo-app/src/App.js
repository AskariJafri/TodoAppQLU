import './App.css';
import Login from './Components/Login';
import { Routes, Route } from "react-router-dom"
import Dashboard from './Components/Dashboard';
function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="todo" element={ <Dashboard/> } />
       </Routes>
     
      
    </div>
  );
}
export default App;
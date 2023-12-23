import React, { useState } from "react";
import { Container,Button,Form } from "react-bootstrap";
import "../styles/Login.css";
import axios from "axios";
import API_URL from "../../config/global";
import {Link,useNavigate} from 'react-router-dom';
function Login({onLogin}) {
       const [formData,setformdata] = useState({
        email:"",
        password:""
    });
    const navigate = useNavigate();
    const handleChange = (e)=>{
        const{name,value}=e.target;
        setformdata({...formData,[name]:value});
    }
    const handlesubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post(`${API_URL}/login`,formData);
            console.log(response);
            if(response.data === "Invalid Username or password"){
                alert("Invalid Username or password...");
            }else if(response.data === "Server Busy"){
                alert("Verify the Email Id..");
            }else if(response?.status){
                localStorage.setItem("userInfo",JSON.stringify(response.data));
                alert("Logged in Successfully..");
                navigate("/home");
                
            }
        }
        catch(e)
        {
            console.error("Error occured during Registration..",e);
        }
    
     
    };
  return (
    <Container>
    <h1>Login Form</h1>
    <Form onSubmit={handlesubmit}>
    
        <Form.Group>
            <Form.Label>Email :</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required/>
        </Form.Group>
        <Form.Group>
            <Form.Label>Password :</Form.Label>
            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required/>
        </Form.Group>
        <Button type="submit" variant="primary" onClick={handlesubmit}>Login</Button>
        <p>New User ? <Link to="/">Register</Link></p>
    </Form>
   </Container>
  )
}

export default Login
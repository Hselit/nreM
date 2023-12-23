import React, { useState } from "react";
import { Container,Button,Form } from "react-bootstrap";
import "../styles/SignUp.css";
import {Link,useNavigate} from 'react-router-dom';
import axios from "axios";
import API_URL from "../../config/global";
const SignUp = () =>{
const [formData,setformdata] = useState({
    name:"",
    email:"",
    password:""
})
const handleChange = (e)=>{
      const{name,value}=e.target;
      setformdata({...formData,[name]:value});
}
const handlesubmit = async(e)=>{
    e.preventDefault();
    try{
        const response = await axios.post(`${API_URL}/signin/verify`,formData);
        console.log(response);
        if(response.data === true){
            alert("Registeration Link send to your Email id..");
        }else if(response.data === false){
            alert("User already Exists..");
        }
    }
    catch(e)
    {
        console.error("Error occured during Registration..",e);
    }


}

    return(
       <Container>
        <h1>Registration Form</h1>
        <Form onSubmit={handlesubmit}>
            <Form.Group>
                <Form.Label>Name :</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email :</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password :</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required/>
            </Form.Group>
            <Button className="but" type="submit" variant="primary">Register</Button>
            <p>Already having Account <Link to="/login">Login</Link></p>
        </Form>
       </Container>
    )
}

export default SignUp;
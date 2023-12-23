import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import '../styles/HOme.css';
import axios from "axios";
import API_URL from "../../config/global";

const Home = () => {
  const [res,setRes]=useState({});

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user && user.token){
      getData(user.token)
    }
  },[]);

  const getData = async(token)=>{
    try{
      const config = {
        headers:{
          Authorisation:token
        }
      }
        const response = await axios.post(`${API_URL}/home`,config);
        console.log(response);
        if(response.data === "Invalid Token"){
          alert("Login Again");
        }
        else if(response.data === "Server Busy"){
          alert("Unauthorized Access");
        }else if(response?.status){
          setRes(response.data);
        }
    }
    catch(e){
      console.log(e);
    }
  }
  return (
    <Container><h3>Welcome to our Website</h3>
    <p> Hii {res.name}</p>
    <Button type='submit' varient='primary'>Get Started..</Button>
    </Container>
  )
}

export default Home
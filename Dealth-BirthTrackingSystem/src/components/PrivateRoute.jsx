import React,{useState,useEffect} from 'react'

import { Navigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import { REFRESH_TOKEN,ACCESS_TOKEN } from '../constant'


export const PrivateRoute = ({children}) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await auth(); 
      } catch (error) {
        setIsAuthorized(false); 
      }
    };
  
    checkAuth(); 
  }, []);
  

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try{
      const res = await api.post("api/token/refresh/",{refresh: refreshToken});

      if(res.status === 200){
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        setIsAuthorized(true)
      } else{
        setIsAuthorized(false)
      }

    }catch(error){
        console.log(error);
        setIsAuthorized(false);
    }

  } 

  const auth = async () => {

    const token = localStorage.getItem(ACCESS_TOKEN);
    if(!token){
        setIsAuthorized(false);
        return
    }

    const decoded = jwtDecode(token);
    const tokenExperition = decoded.exp;
    const now = Date.now() /1000;

    if(tokenExperition < now){
        await refreshToken();
    } else{
        setIsAuthorized(true);
    }


  }

  if(isAuthorized === null) {
      return <div>Loading...</div>
  }

  return isAuthorized ? children : <Navigate to='/login' />;
    
  
}

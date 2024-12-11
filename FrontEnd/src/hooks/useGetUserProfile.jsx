

import {  setUserProfile } from '@/redux/authSlice';
import axios from 'axios';
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function useGetUserProfile(userId) {
  const dispatch = useDispatch();

  useEffect(()=>{

        async function fetchUserProfile(){
            try {
            const res = await axios.get(`http://localhost:8000/api/v1/user/${userId}/profile`,{withCredentials:true});
            if(res.data.success){
                dispatch(setUserProfile(res.data.user));
            }
        } catch (error) {
                console.log("useGetUserProfile error>",error);
        }
    }
    fetchUserProfile();
    },[userId]);
}

export default useGetUserProfile;



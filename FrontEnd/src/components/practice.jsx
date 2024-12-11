import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'sonner';
    
function practice() {
    
    const [like , setLike] = useState(post.likes.includes(user._id) || false);

    async function likeDislikeHandler(){
        try {
            const type = like?"dislike":"like"
            const res  = await axios.post(`http://localhost:8000/api/v1/post/${post._id}/${type}`,{withCredentials:true});
            if(res.data.success){
                toast.success(res.data.messege);
            }
        } catch (error) {
            console.log(error); 
        }
    }
    
  return (
    <>
      
    </>
  )
}

export default practice

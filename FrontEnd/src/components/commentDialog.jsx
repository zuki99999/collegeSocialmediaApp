import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./comment";
import axios from "axios";
import { toast } from "sonner";




function CommentDialog({ open, setOpen ,post}) {


  const [text , setText] = useState('');
  const { selectedPost, posts } = useSelector(store => store.post);
  // console.log("selected post",selectedPost);
  const dispatch = useDispatch();
  const [comment , setComments] = useState(post?.comments);


  function changeEventHandler(e){
    const input = e.target.value;
    if(input.trim()){
      setText(input);
    }else{
      setText('');
    }
  }

  const sendMessageHandler = async() =>{

    try {
      const res = await axios.post(`http://localhost:8000/api/v1/post/${post._id}/comment`,{text},{
        headers:{
          "content-Type":"application/json"
        },
        withCredentials:true
      });
      
      if(res.data.success){
       
        const updatedCommentData = [...comment , res.data.comment];
        setComments(updatedCommentData);
        const updatedPostData = posts.map(p => p._id === post._id ? {...p,comments:updatedCommentData}:p
        );
        dispatch(setPosts(updatedPostData))
        toast.success(res.data.message);
        setText('');
      }
    } catch (error) {
      console.log(error);
    }finally{
      setText('');
    }
  }


  return (
    <>
      <Dialog open={open}>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className="max-w-5xl p-0 flex flex-col"
        >
          <div className="flex flex-1 gap-5">
            <div className="w-1/2 ">
              <img
                className="w-full h-full rounded "
                src={selectedPost?.image}
                alt="post_image"
              />
            </div>

            <div className="w-1/2 flex flex-col justify-between">
              <div className="flex items-center justify-between p-4">
                <div className="flex justify-between icons-center gap-2">
                  <Link>
                    <Avatar>
                      <AvatarImage src={selectedPost?.author?.profilePicture} alt="post_Image" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="pt-2">
                    <Link className="font-semibold text-sm">{selectedPost?.author?.username}</Link>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="flex flex-col items-center text-sm">
                    <div className="cursor-pointer w-full text-[#ED4956] font-bold hover:bg-slate-100 p-2 rounded-lg ">
                      Report
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <hr />
              <div className="flex-1 overflow-y-auto max-h-96 p-4">
                {
                  comment.map((comment)=><Comment key={comment._id} comment={comment} />)
                }
              </div>
              <div className="p-4">
                <div className="flex justify-between gap-1">
                  <input
                    value={text}
                    onChange={changeEventHandler}
                    type="text"
                    placeholder="add comment..."
                    className="w-full outline-none border border-gray-300 rounded-lg p-1"
                  />

                  {
                    text && <Button variant="outline" onClick={sendMessageHandler}> <Send/> </Button>
                  }   

                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CommentDialog;

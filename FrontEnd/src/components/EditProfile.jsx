import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";
import axios from "axios";

function EditProfile() {
  const { user } = useSelector((store) => store.auth);

  const imageRef = useRef();
  const [loding , setLoding] = useState(false);
  const [input , setInput] = useState({
    profilepicture:user?.profilepicture,
    hobby:user?.hobby,
    gender:user?.gender
  });
const navicate = useNavigate();
const dispatch = useDispatch();

const fileChangeHandler = (e)=>{
    console.log("e>>>",e);
    const file = e.target.files[0];
    if(file){
        setInput({...input,profilepicture:file});
    }
}
const selectChangeHandler = async(value)=>{
    setInput({...input,gender:value})
}

  const editProfileHandler = async ()=>{
    const formData = new FormData();
    formData.append('hobby',input.hobby);
    if (typeof input.gender === "undefined") input.gender = "";
    formData.append('gender',input.gender);
    if(input.profilepicture){
        formData.append("profilepicture",input.profilepicture);
    }
    console.log("formData...???>>>>>",formData);

    try{
        setLoding(true);
        const res = await axios.post("http://localhost:8000/api/v1/user/profile/edit",formData,{header:{
            "Content-Type":"multipart/form-data"
        },"withCredentials":"true",
    });
    console.log(res);
    if(res.data.success){
        toast.success(res.data.message);
        const updatedUserData = {
            ...user,
            hobby:res.data.user.hobby,
            profilepicture:res.data.user?.profilepicture,
            gender:res.data.gender
        };
        dispatch(setAuthUser(updatedUserData));
        navicate(`/profile/${user?._id}`);
    }
    }catch(error){
        console.log(error);
        toast.error(error.response.data.message);
    }finally{
        setLoding(false);
    }
  }
  return (
    <div className="flex max-w-2xl mx-auto pl-10">
      <section className="flex flex-col gap-6 w-full">
        <h1 className="font-bold text-xl">Editprofile</h1>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg justify-between p-4">
          <div className="flex items-center  gap-2">
            <Avatar>
              <AvatarImage src={user?.profilepicture} alt="post_Image" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex items-center gap-3">
              <h1>{user?.username}</h1>
            </div>
          </div>
          <input ref={imageRef} onChange={fileChangeHandler} type="file" className="hidden" />
          <Button onClick={() => imageRef.current.click()}>
            Change Profile
          </Button>
        </div>
        <div className="">
          <h1>Hobby</h1>
          <Textarea value={input.hobby} onChange={(e)=>setInput({...input , hobby:e.target.value})} name="hobby" />
        </div>

        <div >
          <Select defaultValue={input?.gender} onValueChange={selectChangeHandler}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
            {
            loding?(<Button onClick={editProfileHandler}  className="w-fit px-8"><Loader2 className="animate-spin"/></Button>):(<Button onClick={editProfileHandler} className="w-fit">Submit</Button>)
            }
        </div>
      </section>
    </div>
  );
}

export default EditProfile;

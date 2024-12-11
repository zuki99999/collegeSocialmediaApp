// import jwt, { verify } from "jsonwebtoken";
import pkg from 'jsonwebtoken';
const { verify } = pkg;

// const token = process.env.TOKEN;
// const secret = "your-secret-key";

const isAuthenticated = async(req,res,next)=>{
    
    try{
        const token = req.cookies.token;
        if(!token){
            console.log("token",res.cookies.token);
            return res.status(401).json({
                message:"user not authenticated",
                success:false
            });
        }

        const decode = await verify(token , process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"invalid",
                success:false,
            });
        }
        req.id = decode.userId;

        next()
    }catch(err){()=>console.log("error:",err)}
}

export default isAuthenticated;
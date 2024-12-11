import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log("mongodb connected"))
        .catch((err)=>console.log(`error:${err}`));
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;



//mongodb+srv://sagarpantaa6:nGd1ZrMY4DkPBuP8@cluster0.ukhyjf5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
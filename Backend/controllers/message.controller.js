import {Conversation} from "../model/conversation.model.js"
import { Message } from "../model/message.model.js";

export const sendMessage = async(req,res)=>{
    try {
        const senderId = req.id;
        const reciverId = req.params.id;
        const {message} = req.body;

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,reciverId]}
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,reciverId]
            });
        }
        const newMessage = await Message.create({
            senderId,
            reciverId,
            message
        });
        if(newMessage) conversation.message.push(newMessage._id);
        await Promise.all([conversation.save(),newMessage.save()]);

        //implement socket io for real time data trsnsfer...///

        return res.status(201).json({
            success:true,
            newMessage
        });
        
    } catch (error) {
        console.log(error);
    }
}

export const getMessage = async (req,res)=>{
    try {
        const senderId = req.id;
        const reciverId = req.params.id;

        const conversation = await Conversation.find({
            participants:{$all:[senderId,reciverId]}
        });
        if(!conversation) return res.status(200).json({success:true,messages:[]});

        return res.status(200).json({success:true,messages:conversation?.messages});
    } catch (error) {
        console.log(error);
    }
}


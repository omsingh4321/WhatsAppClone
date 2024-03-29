import Conversation from "../model/Conversation.js";

export const newConversation=async(request,response)=>{
  try{
   const senderId=request.body.senderId;
   const reciverId=request.body.reciverId;

   const exist= await Conversation.findOne({members: { $all: [reciverId,senderId]}});
   if(exist) return response.status(200).json('Conversation Already Exisit');
   const newConversation= new Conversation({
    members: [senderId,reciverId],

   })
   
  await  newConversation.save();
  return response.status(200).json('Conversation saved');
  }
  catch(error){
   return response.status(500).json(error.message);
  }
}
export const getConversation=async(request,response)=>{
   try{
    const senderId=request.body.senderId;
   const reciverId=request.body.reciverId;
     let conversation= await Conversation.findOne({members:{$all: [reciverId,senderId]}})
     return response.status(200).json(conversation);
   }
   catch(error)
   {
    return response.status(500).json(error.message);
   }

}
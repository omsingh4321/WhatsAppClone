import axios from 'axios';

const url="http://localhost:5000";

export const addUser= async (data)=>{
    try{
      await axios.post(`${url}/add`,data);
    }
    catch(error)
    {
        console.log("Error Occuring"+error);
    }
}
export const getUsers=async()=>{
  try{
    const response=await axios.get(`${url}/users`);
    return response.data;

  }
  catch(error)
  {
   console.log("Error in getUsers:- "+ error.message);
  }

}
export const setConversation=async(data)=>{
  try{
    await axios.post(`${url}/conversation/add`,data);

  }
  catch (error){
    console.log("Error in setConversation:- "+ error.message);
  }
}
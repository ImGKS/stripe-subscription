
import axios from "axios";
import { useEffect } from "react";

const Success = () => {

    const queryParams = new URLSearchParams(location.search);;
    const sessionId = queryParams.get('session_id');


    const savePayment = async() => {
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:3000/save-payment',
            data: {session_id: sessionId},
            headers: {
                "Content-Type": "application/json",
            },
        })
        console.log({data: response.data});
    }

    useEffect(() => {
        if(sessionId) {
            savePayment()
        }
    },[sessionId])
    
  return (
    <div>success completed</div>
  )
}

export default Success;
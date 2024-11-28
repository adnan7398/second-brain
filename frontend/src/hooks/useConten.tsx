import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent(){
    const [contents , setcontent] = useState([]);
    interface response {
        content: any;
    }
    useEffect(()=>{
        axios.get<response>(`${BACKEND_URL}/api/v1/content`,{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        }).then((response)=>{
            setcontent(response.data.content)
        })
    },[])
    return contents; 
}
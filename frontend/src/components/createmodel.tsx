
import axios from "axios"
import { useRef, useState } from "react"
import { CrossIcon } from "../icons/crossIcon"
import { Button } from "./button"
import { Input } from "./input"
import { BACKEND_URL } from "../config";
enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}
export function CreateContentModel({open,onClose}){
    const tittleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type , setType] = useState(ContentType.Youtube);
    async function addContent(){
        const tittle = tittleRef.current?.value;
        const link = linkRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            link,
            tittle,
            type
        },{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })

    }
     return <div>
        {open && <div>
            <div  className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center" >
            
            </div>
            <div className="w-screen h-screen fixed top-0 left-0  flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded ">
                        <div className="flex justify-end" onClick={onClose}>
                            
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon/>
                            </div>
                        </div>
                        <div >
                            <Input reference={tittleRef} placeholder = {"tittle"}/> 
                            <Input reference={linkRef} placeholder = {"Link"}/>
                        </div>
                        <h1>Type</h1>
                        <div className="flex gap-1 justify-center">
                            <Button text="Youtube" variant= {type === ContentType.Youtube ? "primary":"secondry"} onClick={()=>{
                                setType(ContentType.Youtube);
                            }}></Button>
                            <Button text="Twitter" variant= {type === ContentType.Twitter ? "primary":"secondry"} onClick={()=>{
                                setType(ContentType.Twitter);
                            }}></Button>
                            
                        </div>
                        <div className="flex justify-center mt-2">
                            <Button onClick={addContent} variant="primary" text="Submit" />
                        </div>                   
                    </span>
                </div>
            </div>
        </div> }
     </div>
}


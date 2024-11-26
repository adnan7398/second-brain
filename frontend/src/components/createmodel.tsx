
import { CrossIcon } from "../icons/crossIcon"
import { Button } from "./button"
export function CreateContentModel({open,onClose}){
     return <div>
        {open && <div  className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center" >
            <div className="flex flex-col justify-center">
                <span className="bg-white opacity-100 p-4 rounded">
                    <div className="flex justify-end" onClick={onClose}>
                        
                        <div onClick={onClose} className="cursor-pointer">
                            <CrossIcon/>
                        </div>
                    </div>
                    <div >
                        <Input placeholder = {"Link"}/>
                        <Input placeholder = {"title"}/>
                    </div>
                    <div className="flex justify-center mt-2">
                        <Button variant="primary" text="Submit" />
                    </div>
                    
                </span>
            </div>
        </div>
        }
     </div>
}

function Input({placeholder,onChange}:{onChange:()=>void}){
    return <div>
        <input placeholder={placeholder} type="text" className="px-4 py-2 border rounded" onChange={onChange}/>
    </div>

}
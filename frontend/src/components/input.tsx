import { useRef } from "react";
interface inputProps {
    placeholder:string;
    reference?:any;
    onChange?:()=>void;
}


export function Input({placeholder,reference ,onChange}:inputProps){
    return <div className="px-2 py-2 rounded">
        <input  placeholder={placeholder} type="text" className="px-4 py-2 border rounded" ref = {reference} onChange = {onChange} />
    </div>

}
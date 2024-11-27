import { ReactElement } from "react";

interface Buttonprops {
    variant : "primary" | "secondry";
    text:string;
    startIcon? :ReactElement;
    onClick?:()=>void;
    fullwidth? : Boolean
}
const defaultStyles ="px-4 py-2 m-1 rounded-md font-light flex  items-center";
const variantClasses = {
    "primary":"bg-purple-600 text-white",
    "secondry":"bg-purple-200 text-purple-600"
}

export function Button(props :Buttonprops){
    return <button onClick= {props.onClick} className={variantClasses[props.variant] + " " + defaultStyles + `${props.fullwidth ? " w-full flex justify-center align-center" : " "}`}>
        <div className="pr-2">
            {props.startIcon}
        </div>
        {props.text}
    </button>
}
import { ReactElement } from "react";

export function Sidebaritems({text,icon}:{
    text:string,
    icon:ReactElement
}){
    return <div className="flex py-2 text-gray-700 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-200 ">
        <div className="pr-2">{icon}</div>
        <div >{text}</div>

    </div>
}
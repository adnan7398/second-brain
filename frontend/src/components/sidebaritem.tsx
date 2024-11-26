import { ReactElement } from "react";

export function Sidebaritems({text,icon}:{
    text:string,
    icon:ReactElement
}){
    return <div className="flex">
        <div className="p-2">{icon}</div>
        <div className="p-2">{text}</div>

    </div>
}
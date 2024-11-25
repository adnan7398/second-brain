export interface ButtonProps{
    variant : "primary"|"secondry";
    size:"sm"|"md"|"lg";
    text:String;
    startIcon?:any;
    endIcon?:any;
    onclick?:()=>void;
}

const variantStyles = {
    "primary" :  "bg-purple-600 text-white",
    "secondry":"bg-purple-400 text-purple-600"
}


export const Button =(props:ButtonProps)=>{
    return<button className={variantStyles[props.variant]}></button>
}


<Button size="sm" variant='primary' text ="Share"/>
        




export interface ButtonProps{
    variant : "primary"|"secondry";
    size:"sm"|"md"|"lg";
    text:string;
    startIcon?:any;
    endIcon?:any;
    onclick?:()=>void;
}

const variantStyles = {
    "primary" :  "bg-purple-600 text-white",
    "secondry":"bg-purple-400 text-purple-600"
}
const sizeStyle= {
    "lg":"px-8 py-4",
    "md":"px-4 py-2",
    "sm":"px-2 py-1"
}

export const Button =(props:ButtonProps)=>{
    return<button className={variantStyles[props.variant]}></button>
}


        




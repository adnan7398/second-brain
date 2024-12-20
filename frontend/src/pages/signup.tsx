import axios from "axios";
import { Button } from "../components/button"
import { useRef } from "react";
import { Input } from "../components/input"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export  function  Signup(){
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    async function signup() {
        const email = emailRef.current?.value;
        
        const password = passwordRef.current?.value;
        
    
        if (!email || !password) {
            alert("email and password are required!");
            return;
        }
    
        try {
            await axios.post(BACKEND_URL+"/api/v1/signup", {
                email,
                password
            });
            navigate("/signin");
            alert("You are signed up!");
            
        } catch (error) {
            console.error("Signup error:", error);
            alert("Signup failed. Please try again.")
        }
    }
    
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center rounded">
        <div className="bg-white rounded-xl border min-w-48 p-8 ">
            <Input  reference = {emailRef} placeholder ="email" />
            <Input reference= {passwordRef} placeholder = "Password"></Input>
           <div className="flex justify-center pt-4-2">
                <Button  onClick = {signup} variant="primary" text="Signup" fullwidth={true}/>
           </div>
        </div>
    </div>
}
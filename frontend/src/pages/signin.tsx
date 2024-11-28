import axios from "axios";
import { useRef } from "react";
import { Button } from "../components/button"
import { Input } from "../components/input"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export function  Signin(){
        const emailRef = useRef<HTMLInputElement>();
        const passwordRef = useRef<HTMLInputElement>();
        const navigate = useNavigate();
        async function signin() {
            interface SigninResponse {
                token: string;
            }
            const email = emailRef.current?.value;  
            const password = passwordRef.current?.value;           
            if (!email || !password) {
                alert("email and password are required!");
                return;
            }
        
            try {
                const response  = await axios.post<SigninResponse>(BACKEND_URL + "/api/v1/signin", {
                    email,
                    password
                });
                const jwt = response.data.token;
                localStorage.setItem("token",jwt);
                
                navigate("/dashboard");
                alert("you are signed in ");
            } catch (error) {
                console.error("Signup error:", error);
                alert("Signup failed. Please try again.")
            }
        }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center rounded">
        <div className="bg-white rounded-xl border min-w-48 p-8 ">
            <Input reference={emailRef} placeholder ="Username" />
            <Input reference={passwordRef} placeholder = "Password"></Input>
           <div className="flex justify-center pt-4-2">
                <Button onClick={signin} variant="primary" text="Signin" fullwidth={true}/>
           </div>
        </div>
    </div>
}
import { Button } from "../components/button"
import { Input } from "../components/input"
export function  Signin(){
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center rounded">
        <div className="bg-white rounded-xl border min-w-48 p-8 ">
            <Input placeholder ="Username" />
            <Input placeholder = "Password"></Input>
           <div className="flex justify-center pt-4-2">
                <Button variant="primary" text="Signin" fullwidth={true}/>
           </div>
        </div>
    </div>
}
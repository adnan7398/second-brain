import { TwitterIcon } from "../icons/twittericon";
import { Sidebaritems } from "./sidebaritem";
import { YoutubeIcon } from "../icons/youtubeicon";
import { Logo } from "../icons/logo";
export function Sidebar(){
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
            <div className="flex text-2xl pt-8 items-center ">
                <div className="text-purple-600 pr-2"><Logo/> </div>
                <div>
                    Second Brain
                </div>
            </div>
            
        <div className="pt-8 pl-4">
            <Sidebaritems text ="twitter" icon = {<TwitterIcon/> }/>
            <Sidebaritems text ="Youtube" icon = {<YoutubeIcon/> }/>
            
        </div>
    </div>
}
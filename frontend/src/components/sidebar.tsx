import { TwitterIcon } from "../icons/twittericon";
import { Sidebaritems } from "./sidebaritem";
export function Sidebar(){
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0">
        <div className="pt-4">
            <Sidebaritems text ="twitter" icon = {<TwitterIcon/> }/>
        </div>
    </div>
}
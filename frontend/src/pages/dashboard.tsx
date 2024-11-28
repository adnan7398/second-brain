
import '../App.css'
import { useState } from 'react'
import { PlusIcon } from '../icons/plusicon'
import { ShareIcon } from '../icons/sharIcon'
import { Button } from '../components/button'
import { Card } from '../components/card'
import { CreateContentModel } from '../components/createmodel'
import { Sidebar } from '../components/sidebar'
import { useContent } from '../hooks/useConten'
export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const Contents = useContent();
  return ( <div>
    <div>
      <Sidebar/>
    </div>
    <div className=' p-4 ml-72 min-h-screen bg-gray-100'>
      <CreateContentModel open = {modelOpen} onClose ={()=>{
        setModelOpen(false)
      }} />
        <div className='flex justify-end gap-4'>
            <Button onClick= {()=>{setModelOpen(true)}}variant='primary' text="Add Content"  startIcon ={<PlusIcon/>}></Button>
            <Button variant = 'secondry' text="Share Brain"  startIcon={<ShareIcon/>}></Button>
        </div>
        <div className='flex gap-4'>
          
          {Contents.map(({type,link,tittle})=>
            <Card type={type} link={link} tittle={tittle}></Card>
        )}
        </div>
    </div>
  </div>
  )
}




import '../App.css'
import { useState } from 'react'
import { PlusIcon } from '../icons/plusicon'
import { ShareIcon } from '../icons/sharIcon'
import { Button } from '../components/button'
import { Card } from '../components/card'
import { CreateContentModel } from '../components/createmodel'
import { Sidebar } from '../components/sidebar'
export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);

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
          <Card type='twitter' link="https://x.com/CPMG_Odisha/status/1691491338649481216" tittle="First Tweet"></Card>
          <Card type='youtube' link="https://www.youtube.com/watch?v=yS8k-bWtMWk" tittle="First vedio"></Card>
        </div>
    </div>
  </div>
  )
}



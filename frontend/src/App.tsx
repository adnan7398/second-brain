
import './App.css'
import { PlusIcon } from './icons/plusicon'
import { ShareIcon } from './icons/sharIcon'
import { Button } from './components/button'
import { Card } from './components/card'
function App() {


  return ( <div className='p-4'>
      <div className='flex justify-end gap-4'>
          <Button variant='primary' text="Add Content"  startIcon ={<PlusIcon/>}></Button>
          <Button variant = 'secondry' text="Share Brain"  startIcon={<ShareIcon/>}></Button>
      </div>
      <div className='flex gap-4'>
        <Card type='twitter' link="https://x.com/CPMG_Odisha/status/1691491338649481216" tittle="First Tweet"></Card>
        <Card type='youtube' link="https://www.youtube.com/watch?v=yS8k-bWtMWk" tittle="First vedio"></Card>
      </div>
  </div>
  )
}

export default App

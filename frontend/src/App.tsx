
import './App.css'
import { PlusIcon } from './icons/plusicon'
import { ShareIcon } from './icons/sharIcon'
import { Button } from './components/button'
import { Card } from './components/card'
function App() {


  return ( <div>
      <Button variant='primary' text="Add Content"  startIcon ={<PlusIcon/>}></Button>
      <Button variant = 'secondry' text="Share Brain"  startIcon={<ShareIcon/>}></Button>
      <Card></Card>
  </div>
  )
}

export default App

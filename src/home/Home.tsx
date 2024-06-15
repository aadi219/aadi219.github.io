import { ReactElement } from 'react'
import Navbar from '../components/Navbar'
import Main from './components/Main'

const Home = () : ReactElement => {
  return (
    <div className='w-screen h-screen bg-bg-dark'>
        <Navbar />
        <div className='px-6'>
          <Main />  
        </div>
    </div>
  )
}

export default Home
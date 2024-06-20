import { ReactElement } from "react"
import Navbar from "./Navbar"
import Main from "./Main"

const Template = ({children} : {children: ReactElement}) => {
  return (
    <div className='w-screen h-screen bg-bg-dark'>
        <Navbar />
        <div className='px-8'>
            <Main>
                {children}
            </Main> 
        </div>
    </div>
  )
}

export default Template
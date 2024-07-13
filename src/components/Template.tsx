import { ReactElement } from "react"
import Navbar from "./Navbar"
import Main from "./Main"

const Template = ({children} : {children: ReactElement}) => {
  return (
    <div className='w-screen h-screen bg-bg-dark flex flex-col'>
        <Navbar />
        <div className='px-8 grow'>
            <Main>
                {children}
            </Main> 
        </div>
    </div>
  )
}

export default Template
import { ReactElement } from "react"

const Main = ({children} : {children : ReactElement}) => {
  return (
    <div id="main" className={'border-2 border-teal-200 p-4 home-main flex gap-0 overflow-hidden'} style={{height: '650px'}}>
        {children}
    </div>
  )
}

export default Main
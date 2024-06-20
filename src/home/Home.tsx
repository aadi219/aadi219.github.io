import Template from '../components/Template.tsx'
import { ReactElement } from 'react'
import Main from './components/Main'

const Home = () : ReactElement => {
  return (
    <>
      <Template>
        <Main />
      </Template>
    </>
  )
}

export default Home
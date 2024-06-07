import React, { ReactElement } from 'react'
import Navbar from '../components/Navbar'
import Main from './components/Main'

const Home = () : ReactElement => {
  return (
    <div>
        <Navbar />
        <Main />
    </div>
  )
}

export default Home
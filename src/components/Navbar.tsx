import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export const NavLink = ({addr, text}: {addr:string, text:string}) : ReactElement => {
  return (
    <>
      <span className='navlink px-14 py-2 text-highlight-teal hover:text-highlight-blue transition-colors duration-200'>
        <Link to={addr}>{text}</Link>
      </span>
    </>
  )
}


const Navbar = () : ReactElement => {
  return (
    <div className='w-full flex justify-evenly text-xl'>
      <NavLink addr='/' text='HOME' />
      <NavLink addr='/about' text='ABOUT' />
      <NavLink addr='/projects' text='PROJECTS' />
      <NavLink addr='#contact' text='RESUME' />
    </div>
  )
}

export default Navbar
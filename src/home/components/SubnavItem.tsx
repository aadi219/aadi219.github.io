import { ReactElement } from 'react'

const SubnavItem = ({linkTo} : {linkTo: string}) : ReactElement => {

  const handleClick = () => {
    const section = document.getElementById(linkTo);
    window.scroll({behavior: 'smooth', top: section?.offsetTop})
  }

  return (
    <a onClick={handleClick} href={'#' + linkTo} className='w-[25%] barFill font-heading italic py-1 px-2 hover:text-bg-dark text-cyan-300'>.{linkTo}</a>
  )
}

export default SubnavItem
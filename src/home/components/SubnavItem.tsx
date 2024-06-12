import React, { ReactElement } from 'react'

const SubnavItem = ({linkTo} : {linkTo: string}) : ReactElement => {
  return (
    <a href={'#' + linkTo} className='w-full py-1 px-2 hover:text-bg-dark text-cyan-300'>{linkTo}</a>
  )
}

export default SubnavItem
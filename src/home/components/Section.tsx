import { ReactElement } from 'react'

const Section = ({id, children}: {id: string, children: ReactElement[]}) : ReactElement  => {
  return (
    <section id={id} className='mb-5'>
        {...children}
    </section>
  )
}

export default Section
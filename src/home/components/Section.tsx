import React, { ReactElement } from 'react'

const Section = ({id, children}: {id: string, children: ReactElement[]}) : ReactElement  => {
  return (
    <section id={id}>
        {...children}
    </section>
  )
}

export default Section
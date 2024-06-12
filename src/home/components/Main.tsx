import React, { ReactElement } from 'react'
import SubNav from './SubNav.tsx'
import Section from './Section.tsx'
export const LeftPane = ({children} : {children: ReactElement[]}) => {
  return (
    <div className='flex flex-col pane gap-3 w-[55%] pl-24'>
      {...children}
    </div>
  )
}

export const RightPane = ({children} : {children: ReactElement[]}) => {
  return (
    <div className='flex flex-col pane gap-3 w-[45%] pr-10'>
      {...children}
    </div>
  )
}

const Main = () : ReactElement => {
  return (
    <div className={'border-2 border-teal-200 p-4 home-main flex gap-0'} style={{height: '650px'}}>
      <LeftPane>  
        <h1 className='text-5xl font-bold heading text-highlight-blue text-nowrap'>Aadi Badola</h1>
        <ul className='list-disc flex gap-5 text-highlight-teal flex-wrap'>
          <li className='list-none'>Software Engineer</li>
          <li>Full-Stack Developer</li>
          <li>Data Scientist</li>
        </ul>
        <SubNav />
      </LeftPane>
      <RightPane>
        <Section id="Bio">
          <h2>Bio</h2>
          <p className='w-[86%] text-start'>
            Born in 2004 in India, I was introduced to programming early in High School. Gradually developing and discovering increasingly
            complicated yet elegant solutions for different problems, I realised that programming perfectly encapsulated my love for problem-solving
            and my constant desire to innovate and improve upon my projects. <br/>
            Since then, I have been hooked on Software Development, on a journey of steady improvement and constant discovery.<br/>
            And during this journey I have amassed an extensive and thorough skillset covering fields such as: <br/>
            <span className='font-semibold'>
              Full-Stack Development, Machine Learning & Data Science, Database & Backend Technologies, Project Management and more...
            </span>
          </p>

        </Section>
        <Section id="Skills">
          <h2>Skills & Technologies</h2>
          <ul>
            <li>OOP</li>
            <li>Data Structures</li>
          </ul>
        </Section>
      </RightPane>

    </div>
  )
}

export default Main
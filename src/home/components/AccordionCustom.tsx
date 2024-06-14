import React, { ReactElement, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ProgressBar from './ProgressBar';

const AccordionCustom = ({title, languages}: {title: string, languages : Object[]}) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };


  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{bgcolor: '#0d90bb'}}
      >
        <h3 className='text-white font-semibold text-lg'>{title}</h3>
      </AccordionSummary>
      <AccordionDetails className='bg-bg-med'>
        {languages.map((lang) => <ProgressBar title={lang.title} fillAmt={lang.fill} shouldFill={expanded}/>)}
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionCustom
import React, { ReactElement, useEffect, useState } from 'react'

const ProgressBar = ({title, fillAmt, shouldFill} : {title: string, fillAmt: number, shouldFill: boolean}): ReactElement => {
    fillAmt = fillAmt * 100;
    let [filled, setFilled] = useState(false);
    useEffect(() => {
        if (shouldFill) {
            setFilled(true);
        } else {
            setFilled(false);
        }
    },[shouldFill]) 
    return (
    <div className='progress-bar'>
        <p className='text-white mb-2'>{title}</p>
        <div className={"mb-5 h-2 bg-col-dark w-[96%] overflow-hidden"}>
            <div 
                className={`fill h-2 bg-highlight-teal transition-all duration-700 ${filled ? `w-[${fillAmt}]`:'w-0'}`}
                style={{width : filled ? `${fillAmt}%` : 0}}
            ></div>
        </div>
    </div>
  )
}

export default ProgressBar
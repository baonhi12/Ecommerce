import React, { useState } from 'react'
import Circle from '@uiw/react-color-circle';

const Color = (props) => {
  const { colorData, setColor } = props;
  console.log(colorData);

  return (
    <>
      <ul className='colors mx-3'>
        {colorData && colorData.map((item, index) => (
          <li 
            onClick={() => setColor(item?._id)}
            style={{
              backgroundColor: item?.title,
              listStyle: 'none',
              width: "1.3rem",
              height: "1.3rem",
              borderRadius: '50%',
              cursor: 'pointer',
              marginRight: '0.5rem'  // Add margin between color boxes
            }} 
            key={index}
          ></li>
        ))}
      </ul>
    </>
  )
}

export default Color
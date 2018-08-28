
import React from 'react';

const RendomText = ({ textArray, typedWordsArray, remainingWordsArray }) => {
    return (
      <h4>
        {textArray.map((text, index) => {
          return typedWordsArray[index] === text ? (<div>
            <span style={{ color: 'green' }} key={index}>
              {typedWordsArray + ' '}
            </span>
            <span style={{ color: 'green' }} key={index}>
                {remainingWordsArray + ' '}
            </span>
            </div>
          ) : (
            <span key={index}>{text + ' '}</span>
           
          )
        })}
      </h4>
    )
  }
  RendomText.defaultProps = {
    textArray: [],
    typedWordsArray: [],
    remainingWordsArray: []
  }

  export default RendomText;
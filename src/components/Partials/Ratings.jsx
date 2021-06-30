import React, {useState} from 'react';

function Ratings({handleChange, currentStar}) {

    const renderStarWidget = () => {
        const starInputs = () => {
          let ans = [];
          for (let index = 1; index <= 5; index++) {
            const checked = currentStar && currentStar === index;
            ans.push(
                <React.Fragment key={`rate-${index}`}>
                  <input type="radio" onChange={() => handleChange(index)} name="grading" id={`rate-${index}`} checked={checked}/>
                  <label htmlFor={`rate-${index}`} className="fas fa-star"></label>
                </React.Fragment>
              )
          }
          return ans.reverse();
        }

        return (
            <div className="star-widget-container">
              <div className="star-widget">
                {starInputs()}
                <div>
                  <header></header>
                </div>
              </div>
            </div>
          )
    }
    
    return (
        <>
            {renderStarWidget()}
        </>
    )
}

export default Ratings;

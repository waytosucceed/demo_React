// // import React from 'react'
// // import Data from './../data/Data.json'

// // function Activity () {
// //   return (
// //     <div>
// //       <div className='questionButtons'></div>
// //       <div className='backGroundMainDiv'>
// //         <div>
// //           <div className='question'></div>
// //           <div className='imgContainer'></div>
// //           <div className='optionContainer'></div>
// //           <div className='messageContainer'></div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

import React, { useState } from 'react'
import Data from '../../data/Data_A1.json'
import lastImg from './../../assets/last.jpg'
import backgroundImg from './../../assets/background.png'
import './../Activity.css'

const importAll = r => {
  let images = {}
  r.keys().forEach(key => {
    images[key.replace('./', '')] = r(key)
  })
  return images
}
const allImages = importAll(
  require.context('./../../assets', false, /\.(png|jpe?g|svg)$/)
)

function Activity () {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [showNext, setShowNext] = useState(false)

  const currentQuestion = Data[currentIndex]
  const isLastQuestion = currentIndex >= Data.length

  const handleOptionClick = index => {
    if (index === currentQuestion.correct) {
      setFeedback('✅ Correct! Great job!')
      setShowNext(true)
    } else {
      setFeedback('❌ Try again!')
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 < Data.length) {
      setCurrentIndex(currentIndex + 1)
      setFeedback('')
      setShowNext(false)
    }
  }

  return (
      <>
            <h1 style={{ textAlign: 'center', marginTop: '1% ' }}>Previous Class Questions</h1>

    <div className='activity'>
      {!isLastQuestion && (
        <div className='questionButtons'>
          {Data.map((item, index) => (
            <button
              key={index}
              className={`qBtn ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setCurrentIndex(index)
                setFeedback('')
                setShowNext(false)
              }}
            >
              {item.questionNo}
            </button>
          ))}
        </div>
      )}

      <div className='backGroundMainDiv'>
        {!isLastQuestion && (
          <img
            src={backgroundImg}
            style={{
              position: 'relative',
              width: '90vw',
              height: '70vh',
              top: '2%',
              border: '5px solid #000'
            }}
            alt='Background'
          />
        )}

        {isLastQuestion ? (
          <div className='finalScreen'>
            <img src={lastImg} alt='Completed' className='finalImage' />
          </div>
        ) : (
          <div className='questionContent'>
            <h3 className='questionText'>{currentQuestion.question}</h3>

            <div
              className='middleSection'
              style={{
                justifyContent: currentQuestion.images
                  ? 'space-around'
                  : 'center'
              }}
            >
              {currentQuestion.images && allImages[currentQuestion.images] && (
                <img
                  src={allImages[currentQuestion.images]}
                  alt='question'
                  className='questionImg'
                />
              )}

              <div className='optionGridWithFeedback'>
                <div className='optionGrid'>
                 
                  {currentQuestion.options.map((opt, idx) => {
                    const isImage = typeof opt === 'string' && allImages[opt]

                    return (
                      <button
                        key={idx}
                        className='optionBtn'
                        onClick={() => handleOptionClick(idx)}
                      >
                        {isImage ? (
                          <img
                            src={allImages[opt]}
                            alt={`option-${idx}`}
                            className='optionImage'
                          />
                        ) : (
                          opt
                        )}
                      </button>
                    )
                  })}
                </div>

                {feedback && (
                  <p className='feedbackText'>
                    <span className='emoji' key={feedback}>
                      {feedback.charAt(0)}
                    </span>{' '}
                    {feedback.slice(2)}
                  </p>
                )}
                {showNext && currentIndex + 1 < Data.length && (
                  <button className='nextBtn' onClick={handleNext}>
                    Next
                  </button>
                )}
                {showNext && currentIndex + 1 === Data.length && (
                  <button
                    className='nextBtn'
                    onClick={() => setCurrentIndex(Data.length)}
                  >
                    Finish
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div></>
  )
}

export default Activity

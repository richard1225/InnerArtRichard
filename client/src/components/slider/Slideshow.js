import React from 'react'
import { Slide } from 'react-slideshow-image'

import sample1 from '../slider/sample4.png'
import sample2 from '../slider/sample2.png'
import sample3 from '../slider/sample3.png'

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: false,
  pauseOnHover: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`)
  }
}
const quote =
  '  Inner art inner soul is a platform in which you get in contact with a graphic designer and could start creating your own design!'

const style = {
  div: {
    width: '30%',
    height: '30%',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  quote: {
    paddingTop: '60%',
    color: 'white',
    bottom: '200',
    fontSize: 20
  },
  button: {
    borderRadius: '25px',
    border: 'none',
    padding: '15px',
    backgroundColor: 'black',
    margin: 'auto',
    display: 'block',
    color: 'white'
  }
}
const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide {...properties}>
        <div className="each-slide">
          <div style={{ height: 500, backgroundImage: 'url(' + sample1 + ')' }}>
            <div style={style.div}>
              <h5 style={style.quote}>{quote}</h5>
              <br />
              <button style={style.button}>START CREATING</button>
            </div>
          </div>
        </div>

        <div className="each-slide">
          <div style={{ height: 500, backgroundImage: 'url(' + sample2 + ')' }}>
            <div style={style.div}>
              <h5 style={style.quote}>{quote}</h5>
              <br />
              <button style={style.button}>START CREATING</button>
            </div>
          </div>
        </div>

        <div className="each-slide">
          <div style={{ height: 500, backgroundImage: 'url(' + sample3 + ')' }}>
            <div style={style.div}>
              <h5 style={style.quote}>{quote}</h5>
              <br />
              <button style={style.button}>START CREATING</button>
            </div>
          </div>
        </div>
      </Slide>
    </div>
  )
}
export default Slideshow

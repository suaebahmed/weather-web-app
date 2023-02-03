import React from 'react';
import '../styles/card.css';
import sanny from '../assets/sanny.svg'

function Card() {
  return (
    <div className='card-container'>
        <div>20 Jan 2023</div>
        <div className='card'>
            <div className='card-header'>
                <img src={sanny} alt='show sanny'></img>
                <p>Sunny</p>
            </div>
            <div className='card-line'></div>
            <div className='card-body'>
              <p>23 C / 63 F</p>
              <p>17 C / 63 F</p>
              <p>76$</p>
              <p>06:21 AM</p>
              <p>05:93 PM</p>
            </div>
        </div>
    </div>
  )
}

export default Card
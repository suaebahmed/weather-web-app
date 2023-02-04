import React from 'react';
import '../styles/card.css';

const MONTH = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']

function Card({data}) {

  var s1 = data.list.weather[0].description;
  var description = s1.charAt(0).toUpperCase() + s1.slice(1);
  var max_tmp = data.list.main.temp_max;
  var min_tmp = data.list.main.temp_min;

  var dt = data.list.dt_txt;
  var Today_Date = dt.slice(8,10)+' '+MONTH[parseInt(dt.slice(6,7))]+' '+dt.slice(0,4);

  var hours = parseInt(new Date(data.city.sunset*1000).toTimeString().slice(0,2));
  var sunset = '0'+(hours-12)+(new Date(data.city.sunset*1000).toTimeString().slice(2,5))

  return (
    <div className='card-container'>
        <div>{Today_Date}</div>
        <div className='card'>
            <div className='card-header'>
                <img style={{width:'50px', height:'50px'}} src={`/weather-web-app/icons/${data.list.weather[0].icon}.png`} alt='show sanny'></img>
                <p>{description}</p>
            </div>
            <div className='card-line'></div>
            <div className='card-body'>
              <p>{Math.round(max_tmp)}℃ / {Math.round(max_tmp*(9/5)+32)}℉</p>
              <p>{Math.round(min_tmp)}℃ / {Math.round(min_tmp*(9/5)+32)}℉</p>
              <p>{data.list.main.humidity}%</p>
              <p>{new Date(data.city.sunrise*1000).toTimeString().slice(0,5)} AM</p>
              <p>{sunset} PM</p>
            </div>
        </div>
    </div>
  )
}

export default Card;
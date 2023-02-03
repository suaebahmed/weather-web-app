import React, { useState } from 'react'
import Navbar from './components/Navbar';
import Card from './components/Card';
import { BsSearch } from 'react-icons/bs';
import locationIcon from './assets/location.png';
import calender from './assets/calender.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());


  const url = `https://api.openweathermap.org/data/2.5/weather?q=dubai&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e) =>{
    e.preventDefault();
  }
  return (
    <div className="wrapper">
        <Navbar></Navbar>
        <div className='container'>
            <div className='header'>
                <div className='flex-items location-wrapper'>
                    <div className='location'>
                        <div>
                          <img src={locationIcon} alt='shls'></img>
                        </div>
                        <h2 style={{"marginLeft":"10px"}}>Agra, Uttar Pradesh</h2>
                    </div>
                    <p>27 10'36" & 78 0'29" E</p>
                </div>
                <div className='flex-items search-box'>
                    <form onSubmit={fetchWeather}>
                      <div>
                        <input id='input-field' text='text' placeholder='Search your city here...'></input>
                      </div>
                      <button>
                        <BsSearch size={18}></BsSearch>
                      </button>
                    </form>
                </div>
            </div>
            <hr></hr>
            <div className='all-cards'>
                <div className='card-label'>
                    <div>
                        <p>Select Date:</p>
                        <div className='date-box'>
                          <DatePicker 
                          selected={selectedDate}
                          onChange={(date)=>setSelectedDate(date)}
                          dateFormat = 'dd-MM-yyyy'
                          customInput = {<CustomInput/>}
                          >
                          </DatePicker>
                        </div>
                    </div>
                    <div className='card-label-body'>
                      <p>High Temperature</p>
                      <p>low Temperature</p>
                      <p>Humidity</p>
                      <p>Sunrise Time</p>
                      <p>Sunset Time</p>
                    </div>
                </div>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>
        </div>
    </div>
  );
}

const CustomInput = React.forwardRef(({ value, onClick }, ref) =>{
  var monthName = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
  var id = parseInt(value[3]+value[4]);
  var date = value[0]+value[1]+" "+monthName[id]+" "+value[6]+value[7]+value[8]+value[9];
  return (
    <div className='date-content'>
      <button onClick={onClick} ref={ref}>
        <img src={calender} alt="cand"></img>
      </button>
      <p>{date}</p>
    </div>
  )
});

export default App;

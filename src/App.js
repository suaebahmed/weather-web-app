import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar';
import Card from './components/Card';
import locationIcon from './assets/location.png';
import calender from './assets/calender.svg';
import DatePicker from 'react-datepicker';
import SearchBox from './components/SearchBox';
import 'react-datepicker/dist/react-datepicker.css';
import { Weather_URL,Weather_API_KEY } from './components/utilities';
import './App.css';

function App() {
  const [city, setCity] = useState('Agra, Uttar Pradesh');
  const [weather, setWeather] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(()=>{
    var dummyData = {
      city:"Agra",
      country: "India",
      countryCode: "IN",
      latitude: 27.18,
      longitude: 78.02,
      name: "Agra",
      region: "Uttar Pradesh",
    }
    fetchWeather(dummyData);
  },[]);

  const fetchWeather = async (cityInfo) =>{
      try{
        var url =`${Weather_URL}/forecast?lat=${cityInfo.latitude}&lon=${cityInfo.longitude}&appid=${Weather_API_KEY}&units=metric`; 
        var response = await fetch(url)
        var resData = await response.json()
        
        var filterData = [], lastDate = '', count = 0;
        for(let i=0; i<resData.list.length && count<5; i++){
            let cur = resData.list[i].dt_txt.slice(8,10)
            if(cur !== lastDate){
              filterData.push({city: resData.city, list: resData.list[i]})
              lastDate = resData.list[i].dt_txt.slice(8,10)
              count++;
            }
        }
        setCity(cityInfo.city+', '+cityInfo.region)
        setWeather(filterData)

      }catch(err){
        console.log(err);
      }
  }

  return (
    <div className="wrapper">
        <Navbar></Navbar>
        <div className='container'>
            <div className='header'>
                <div className='flex-items location-wrapper'>
                    <div className='location'>
                        <div>
                          <img src={locationIcon} alt='LOC'></img>
                        </div>
                        <h2 style={{"marginLeft":"10px"}}>{city}</h2>
                    </div>
                    <p className='Geolocation'>27°10'48'' N & 78°1'12'' E</p>
                </div>
                <SearchBox fetchWeather={fetchWeather}></SearchBox>
            </div>
            <div style={{"border":"1px solid rgba(0, 0, 0, 0.2)"}}></div>
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
                      <p>Low Temperature</p>
                      <p>Humidity</p>
                      <p>Sunrise Time</p>
                      <p>Sunset Time</p>
                    </div>
                </div>
                {weather.map((item,id)=>{
                  return <Card key={id} data={item}></Card>
                })
              }
            </div>
        </div>
    </div>
  );
}
var monthName = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']

const CustomInput = React.forwardRef(({ value, onClick }, ref) =>{
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

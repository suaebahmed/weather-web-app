import React, { useState } from 'react';
import { GeoOptions, GeoDB_URL } from './utilities';
import { BsSearch } from 'react-icons/bs';
import '../styles/searchbox.css';

function SearchBox({fetchWeather}) {
  const [filterData,setFilterData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    try {
      const response = await fetch(`${GeoDB_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, GeoOptions);
      const resData = await response.json();
      
      if(!resData.data){
        setFilterData([{city:'Please search for a valid city 😩'}]);
        return;
      }
      setFilterData(resData.data);
    } catch (err) {
      return console.error(err);
    }
  }

  return (
    <div className='flex-items box'>
      <div className='search-box'>
          <form onSubmit={onSubmitHandler}>
            <div>
              <input value={inputValue} onChange={(e)=>setInputValue(e.target.value)} text='text' placeholder='Search your city here...'  id='input-field'></input>
            </div>
            <button>
              <BsSearch size={18}></BsSearch>
            </button>
          </form>
      </div>
      {filterData.length>0 && <div className='dataResult'>
            {filterData.map((data,id)=>{
              return(
                <a key={id} onClick={()=>{
                  fetchWeather(data);
                  setFilterData([]);
                  setInputValue('');
                }} className='dataItem' href={data.label}>
                  <p>{data.city}, {data.region}</p>
                </a>
              )
            })}
      </div>}
    </div>
  )
}

export default SearchBox;
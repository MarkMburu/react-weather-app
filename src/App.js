import React, { useState } from 'react';

const api = {
  key: "ef3852f16420eb9c8821e730385aca1b",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState({});

  const serach = (evt) =>{
   if(evt.key === "Enter"){
     fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
     .then(res => res.json())
     .then(results=> {
       setWeather(results)
       setQuery('')
       console.log(results)
      });
   }
  }
  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()]
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`

  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app ') : 'app warm'}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." 
          onChange={e => setQuery(e.target.value)} value={query} onKeyPress={serach}/>
        </div>
        {(typeof weather.main !== "undefined") ? (
          <div>
        <div className="location-box">
  <div className="location">{weather.name},{weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
          <div className="weather-box">
            <div className="temp">
              {/* 25°c */ Math.round(weather.main.temp)}°c
            </div>
        <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        </div>
        ): ('' )}
      </main>
    </div>
  );
}

export default App;

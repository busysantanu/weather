import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; 

function App() {

  
  const [loading, setLoading] = useState(false);

  const [latvalue, setLatvalue] = useState('N/A');
  const [longvalue, setLongvalue] = useState('N/A');
  
  //   useEffect(() => {
  //       const loadPost = async () => {
  
  //           // Till the data is fetch using API 
  //           // the Loading page will show.
  //           setLoading(true);
  
  //           // Await make wait until that 
  //           // promise settles and return its result
  //           const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=0b4d0c6d5601a37bd10bd9a046fac841");
  
  //           // After fetching data stored it in posts state.
  //           setPosts(response.data);

  //           console.log(response)
  
  //           // Closed the loading page
  //           setLoading(false);
  //       }
  
  //       // Call the function
  //       loadPost();
  //   }, []);
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;

    setLatvalue(`${crd.latitude}`);
    setLongvalue(`${crd.longitude}`);
  /*
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`); */
  }
  
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  if (navigator.geolocation) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state === "granted") {
          //console.log(result.state);
          //If granted then you can directly call your function here
          navigator.geolocation.getCurrentPosition(success);
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(success, errors, options);
        } else if (result.state === "denied") {
          setLatvalue('---');
          setLongvalue('---');
        }
        result.onchange = function () {
         
        };
      });
  } else {
    
  }


  return (
    <div className="App">   
        <div className="container">
          <div className="weather-side">
            <div className="weather-gradient"></div>
            <div className="date-container">
              <h2 className="date-dayname">Tuesday</h2><span className="date-day">15 Jan 2019</span>
              <span className="location">Paris, FR
             
                <div className="latlong">
                  <div className='latlong-inner'>
                    <span className="name">Latitude</span>
                    <span className="value">{latvalue} </span>
                  </div>
                  <div className='latlong-inner'>
                    <span className="name">Longitude</span> 
                    <span className="value">{longvalue} </span>
                  </div>
                </div>
              </span>

            </div>
            <div className="weather-container"><i className="weather-icon" data-feather="sun"></i>
              <h1 className="weather-temp">29°C</h1>
              <h3 className="weather-desc">Sunnyx </h3>
            </div>
          </div>
          <div className="info-side">
            <div className="today-info-container">
              <div className="today-info">
                <div className="precipitation"> <span className="title">PRECIPITATION</span><span className="value">0 %</span>
                  <div className="clear"></div>
                </div>
                <div className="humidity"> <span className="title">HUMIDITY</span><span className="value">34 %</span>
                  <div className="clear"></div>
                </div>
                <div className="wind"> <span className="title">WIND</span><span className="value">0 km/h</span>
                  <div className="clear"></div>
                </div>
              </div>
            </div>
            <div className="week-container">
              <ul className="week-list">
                <li className="active"><i className="day-icon" data-feather="sun"></i><span className="day-name">Tue</span><span className="day-temp">29°C</span></li>
                <li><i className="day-icon" data-feather="cloud"></i><span className="day-name">Wed</span><span className="day-temp">21°C</span></li>
                <li><i className="day-icon" data-feather="cloud-snow"></i><span className="day-name">Thu</span><span className="day-temp">08°C</span></li>
                <li><i className="day-icon" data-feather="cloud-rain"></i><span className="day-name">Fry</span><span className="day-temp">19°C</span></li>
                <div className="clear"></div>
              </ul>
            </div>
            <div className="location-container">
              <button className="location-button"> <i data-feather="map-pin"></i><span>Change location</span></button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;

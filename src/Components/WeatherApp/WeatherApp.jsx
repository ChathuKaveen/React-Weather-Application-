import React, { useState } from 'react'
import './WeatherApp.css'
import clear_icon from '../Assets/clear.png';
import hum_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';
import clouds_icon from '../Assets/clouds.png';
import search_icon from '../Assets/search.png';



export default function WeatherApp() {
    let apiKey="568371ea0b1a13f89837c21ca6c900ef";
    const [wicon,setWicon]=useState(clouds_icon);
        const search =async()=>{
            const element=document.getElementsByClassName("cityInput");
        
            if(element[0].value==="")
            {
                return 0;
            }
            const apiLink=`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${element[0].value}&appid=${apiKey}`;
            let responce=await fetch(apiLink);
            let data=await responce.json();
            let hum=document.getElementsByClassName("humidity");
            let wind=document.getElementsByClassName("wind");
            let location=document.getElementsByClassName("location");
            let temp=document.getElementsByClassName("weatherTemp");

            hum[0].innerHTML=data.main.humidity+" %";
            wind[0].innerHTML=Math.floor(data.wind.speed)+" km/H";
            location[0].innerHTML=data.name;
            temp[0].innerHTML=Math.floor(data.main.temp)+" °C";

            if(data.weather[0].icon==="01d"|| data.weather[0].icon==="01n"){
                setWicon(clear_icon);
            }else if(data.weather[0].icon==="02d"|| data.weather[0].icon==="02n"){
                setWicon(clouds_icon);
            }
        }
   
  return (
    <div>
        
      <div className="container">
        <div className="topBar">
            <input type="text" className='cityInput' placeholder='insert city' ></input>
            <div className="searchIcon" onClick={()=>{search()}}>
                <img src={search_icon} />
            </div>
            
        </div>
        <div className="weatherImg">
                <img src={clouds_icon}/>
        </div>
        <div className="weatherTemp">
            24°C
        </div>
        <div className="location">London</div>
        <div className="dataContainer">
            <div className="element">
                <img  src={hum_icon} className='icon'/>
                <div className="data">
                    <div className="humidity">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>

            <div className="element">
                <img className='icon' src={wind_icon}/>
                <div className="data">
                    <div className="wind">13km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

import './styles.css';
import { getWeather, currentLocationWeather } from './loader';

document.addEventListener('DOMContentLoaded',()=>{
    currentLocationWeather()
})

document.querySelector('.searchButton').addEventListener('click',()=>{
    const city = document.getElementById('searchArea').value
    getWeather(undefined,undefined,city)
    document.querySelector('#searchArea').value=''
})

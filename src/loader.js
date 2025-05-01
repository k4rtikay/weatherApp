import { populateWeather } from "./display";

export async function currentLocationWeather(){
    navigator.geolocation.getCurrentPosition(
        async (pos)=>{
            const lng = pos.coords.longitude;
            const lat = pos.coords.latitude;
            const city = await geoCodeCity(lat,lng);
            getWeather(lat,lng);
        },
        (error)=>{
            console.log("error getting location", error)
        });
}

export async function getWeather(lat,lng,city) {
    let url=''

    if(lat&&lng){
        url=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lng}?unitGroup=metric&key=SWTF5ZNECPAWFCALX8SGQNTSV`
    }
    else if(city){
        url=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=SWTF5ZNECPAWFCALX8SGQNTSV`
    }else{
        console.log('no data provided');
        return
    }

    const response = await fetch(url)
    const weatherData = await response.json()

    const temperature = weatherData.currentConditions.temp
    const des = weatherData.description
    const address = weatherData.resolvedAddress

    populateWeather(temperature,des,address)
}

async function geoCodeCity(lat,lng){
    const response =  await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=eb4b52ca68d84db78eeb5688af687a84`)
    const geoAdd = await response.json()
    const result = geoAdd.results[0].components.city
    console.log(result)
    return result
}

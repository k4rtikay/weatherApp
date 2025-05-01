
export function populateWeather(temp, des,city){
    const weatherCard=document.querySelector('.weatherCard');
    weatherCard.innerHTML=`
    <h3>${city}</h3>
    <h1>${temp}C</h1>
    <h4>${des}</h4>`;
}
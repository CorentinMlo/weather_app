// console.log('Client side javascript is loaded');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
// console.log(response);
    
// response.json().then((data) => {
//         console.log(data);
        
//     })
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    search.value = ''

    messageOne.textContent = "Loading for " + location + " ..."
 
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
                
            } else {
                messageOne.textContent = data.location;
                //messageTwo.textContent = data.forecast;
                
                messageTwo.innerHTML = `<ul><li><span class="listHeader">Sumary</span> : ${data.forecast.daily.data[0].summary}</li>
                    <li><span class="listHeader">Temperature</span> : ${data.forecast.currently.temperature} °C</li>
                    <li><span class="listHeader">Precipitation probability</span> : ${data.forecast.currently.precipProbability * 100} %</li>
                    <li><span class="listHeader">Wind speed</span> : ${data.forecast.currently.windSpeed} m/s</li>
                    <li><span class="listHeader">Cloud cover</span> : ${data.forecast.currently.cloudCover * 100} %</li>
                    <li><span class="listHeader">Uv index</span> : ${data.forecast.currently.uvIndex}</li>
                </ul></br> > you will find all the information and forecasts for the coming days <a class="linkToApi" target="_blank" href="https://darksky.net/forecast/${data.forecast.latitude},${data.forecast.longitude}/ca12/en">here</a>`
            }
        })
    })

    console.log(location);
    
})
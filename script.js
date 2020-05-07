window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegreeF = document.querySelector('.temperature-degree-f');
    let temperatureDegreeC = document.querySelector('.temperature-degree-c');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');
    let currentTime = document.querySelector('.location-current-time');
    let celciusDegree = 0;
    
    if(navigator.geolocation){ //Get the current location of the device
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/' //Need to use this because darksky does not allow access from local host.
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat}, ${long}`;
            
            //Update the data every second
            setInterval(function(){
                fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        const {temperature, summary, icon} = data.currently; //same with data.currently.temperature, data.currently.summary and data.currently.icon
                        celciusDegree = ((temperature-32)*(5/9)).toFixed(2);
                        var today = new Date();
                        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    
                        //Set DOM elements from the API
                        temperatureDegreeC.textContent = celciusDegree + "°C";
                        temperatureDegreeF.textContent = temperature + "°F";
                        temperatureDescription.textContent = summary;
                        locationTimezone.textContent = data.timezone.replace(/_/g, " "); 
                        currentTime.textContent = time;
                    
                        //Set Icon depends on the weather (using skycons https://darkskyapp.github.io/skycons/)
                        setIcons(icon, document.querySelector('.icon'));
                    })     
            }, 1000);
        });
    }else {
        //Need to have the access to the current location in order to work
        h1.textContent = "Hey this is not working, please allow us to access your location";
    }
    
    function setIcons(icon, canvas){
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(canvas, Skycons[currentIcon]);
    }
});
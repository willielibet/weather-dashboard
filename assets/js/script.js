
delete(city);
let cityArray=[];
let searchCity = $("#searchCity");
let searchButton = $("#searchButton");
let currentCity = $("#currentCity");
let currentTemp = $("#currentTemp");
let currentHumidty= $("#humidity");
let currentWSpeed=$("#windSpeed");
let currentUvindex= $("#uvIndex");

//click events
$("#searchButton").on("click",currentWeather);

let apiKey = "f0c6b76539b7811c6d773e5325562769";

function currentWeather(){

    let city = searchCity.val().trim();
    //get a data from api
    let queryURL= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(queryURL) 
    .then( response => {
        return response.json();
    }).then(function(response){
        let data = response;

        let weatherIcon= data.weather[0].icon;
        let iconurl=`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

        //get city, date, and weather icon from api parse.
        //date
        let date = moment().format("MM/DD/YYYY"); 

         //icon
        //current city, date and icon
        $(currentCity).html(data.name +" ("+date+")" + "<img src="+iconurl+">");

        $(currentTemp).html((data.main.temp).toFixed(2)+"&#8457");
        $(currentHumidty).html(data.main.humidity+"%");

        let currentWindSpeed=(data.wind.speed*2.237).toFixed(1);
        $(currentWSpeed).html(currentWindSpeed+" MPH");

        //UV Index.
        //longitud, latittude and id
        UVIndex(data.coord.lon,data.coord.lat);

        forecast(data.id);

    });
}

//uv index
function UVIndex(lt,ln){
    let uvURL=`https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lt}&lon=${ln}`;

    $(currentUvindex).empty();
    fetch(uvURL) 
    .then( response => {
        return response.json();
    }).then(function(response){
    let uvIndexData = response;
    
    //checking the UV-index-Scale reading
    if (uvIndexData.value >= 0 && uvIndexData.value <= 2) {
        $(currentUvindex).text("Low: " + uvIndexData.value);
        $(currentUvindex).css("background", "green");
        $(currentUvindex).html(uvIndexData.value);
    }
    else if (uvIndexData.value >= 3 && uvIndexData.value <= 5) {
        $(currentUvindex).text("Moderate: " + uvIndexData.value);
        $(currentUvindex).css("background", "yellow");
        $(currentUvindex).html(uvIndexData.value);
    }
    else if (uvIndexData.value >= 6 && uvIndexData.value <= 7) {
        $(currentUvindex).text("High: " + uvIndexData.value);
        $(currentUvindex).css("background", "orange");
        $(currentUvindex).html(uvIndexData.value);
    }
    else if (uvIndexData.value >= 8 && uvIndexData.value <= 10) {
        $(currentUvindex).text("Very High: " + uvIndexData.value);
        $(currentUvindex).css("background", "red");
        $(currentUvindex).html(uvIndexData.value);
    }
    else if (uvIndexData.value >= 11) {
        $(currentUvindex).text("Extreme: " + uvIndexData.value);
        $(currentUvindex).css("background", "purple");
        $(currentUvindex).html(uvIndexData.value);
    }
    

    });

}

//5-day forecast for the current city
function forecast(cityid){
    let forcastURL=`https://api.openweathermap.org/data/2.5/forecast?id=${cityid}&appid=${apiKey}`;
    
    fetch(forcastURL) 
    .then( response => {
        return response.json();
    }).then(function(response){
        let forecastData = response;
        let i = 0;
        for (i=0;i<5;i++){
            let date = moment().add((i+1), 'days').format("MM/DD/YYYY"); 
            let iconcode= forecastData.list[((i+1)*8)-1].weather[0].icon;
            let iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
            let tempK= forecastData.list[((i+1)*8)-1].main.temp;
            let tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
    
            let humidity= forecastData.list[((i+1)*8)-1].main.humidity;
            //alert("humidity " + humidity)
        
            $("#day"+i).html(date);
            $("#img"+i).html("<img src="+iconurl+">");
            $("#temp"+i).html(tempF+"&#8457");
            $("#humidity"+i).html(humidity+"%");
        }
        
    });
}




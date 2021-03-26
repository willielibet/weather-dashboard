
delete(city);
let cityArray=[];
let searchCity = $("#searchCity");
let searchButton = $("#searchButton");
let currentCity = $("#currentCity");
let currentTemp = $("#currentTemp");
let currentHumidty= $("#humidity");
let currentWSpeed=$("#windSpeed");

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

       //get city, date, and weather icon from api parse.

        //date
        let date = moment().format("MM/DD/YYYY"); 

         //icon
         let weatherIcon= data.weather[0].icon;
         let iconurl="https://openweathermap.org/img/wn/"+weatherIcon +"@2x.png";

        //current city, date and icon
        $(currentCity).html(data.name +" ("+date+")" + "<img src="+iconurl+">");
       
        let fahrenheitTemp = (data.main.temp - 273.15) * 1.80 + 32;
        $(currentTemp).html((fahrenheitTemp).toFixed(2)+"&#8457");
        $(currentHumidty).html(data.main.humidity+"%");

        let currentWindSpeed=(data.wind.speed*2.237).toFixed(1);
        $(currentWSpeed).html(currentWindSpeed+" MPH");

       
  
    });
}


        
//     });
// }






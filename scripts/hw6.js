
var cities = document.querySelector('.cities');
var submit = document.querySelector('#submit');
var input = document.querySelector('#inputSmall');
var data;
var Request;
var Request2;
var Request3;
var coord1;
var lon;
var lat;
var date = new Date();
    

if (localStorage.getItem('searches')){
    var searches = JSON.parse(localStorage.getItem('searches'));
//  document.querySelector('.cities').innerHTML += searches;
}else{
    var searches = [];
}

document.querySelector('.cities').innerHTML = searches.join('');

    
function doTwo(data){
    Request2 = new XMLHttpRequest();
        Request2.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q='+ input.value +'&mode=json&appid=41fc8ca598f3a7d7ba154982bb7f9da1&units=imperial');
        Request2.onload = () => {
            data = JSON.parse(Request2.responseText);
        
            document.querySelector('#cityDate').innerHTML = data.city.name + '; ' + data.list[0].dt_txt /*date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();*/
            $('#temp').text(Math.floor(data.list[0].main.temp) + '°');
            $('#hum').text(data.list[0].main.humidity + '%');
            $('#wind').text(data.list[0].wind.speed);
           

        for(i=0; i<39;){
            document.querySelectorAll('.card')[i/8].innerHTML = (data.list[i].dt_txt+'<img src="http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png" width = "16" height = "16"></img></br> Temp: '+Math.floor(data.list[i].main.temp)+ '° </br> Hum: ' + data.list[i].main.humidity +'%</br>');
            i = i+8;
            };

            searches.push('<button class = "city">'+ input.value + '</button></br>');
           
            if(searches.length > 8){
            searches.shift();
            };
            var searches2 = JSON.stringify(searches);
            localStorage.setItem('searches', searches2);
            var searches3 =JSON.parse(localStorage.getItem('searches'));
            document.querySelector('.cities').innerHTML = searches3.join('');

            coord1 = data.city.coord;
             lat = coord1.lat;
             lon = coord1.lon;    
            //console.log(lat);
            //console.log(lon);
        };

        Request2.send();
        return data;
};

cities.addEventListener('click', function(event){
    if(event.target.matches('.city')){
        input.value = event.target.textContent;


    function doThree(hold){
        var hold = doTwo();
        Request3 = new XMLHttpRequest();
        Request3.open('GET', 'http://api.openweathermap.org/data/2.5/uvi?lat=33.875294&lon=-117.566437&mode=json&appid=41fc8ca598f3a7d7ba154982bb7f9da1');
        Request3.onload = function(){
            data2 = (Request3.responseText);         
        };
        console.log(hold);
        }
        doThree();
    }
    
    });
        

    


submit.addEventListener('click', function(){
    Request = new XMLHttpRequest();
    Request.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q='+ input.value +'&mode=json&appid=41fc8ca598f3a7d7ba154982bb7f9da1&units=imperial');
    Request.onload = function(){
        data = JSON.parse(Request.responseText);
        for(i=0; i<40;){
            document.querySelectorAll('.card')[i/8].innerHTML = (data.list[i].dt_txt+'<img src="http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png" width = "16" height = "16"></img></br> Temp: '+Math.floor(data.list[i].main.temp)+ '° </br> Hum: ' + data.list[i].main.humidity +'%</br>');
            i = i+8;
            };

            $('#cityDate').text(data.city.name + '  ; ' + date.getDay() + '/' + date.getMonth() + '/' + date.getUTCFullYear());
            $('#temp').text(Math.floor(data.list[0].main.temp) + '°');
            $('#hum').text(data.list[0].main.humidity + '%');
            $('#wind').text(data.list[0].wind.speed);

            searches.push('<button class = "city">'+ input.value + '</button></br>');
           
            if(searches.length > 8){
            searches.shift();
            };
            var searches2 = JSON.stringify(searches);
            localStorage.setItem('searches', searches2);
            searches3 =JSON.parse(localStorage.getItem('searches'));
            document.querySelector('.cities').innerHTML = searches3.join('');
            //'<button>'+ input.value + '</button></br>';
            
   
    };
     Request.send();
    return data;
    

});






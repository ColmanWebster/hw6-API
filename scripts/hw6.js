
var submit = document.querySelector('#submit');
var input = document.querySelector('#inputSmall');
var data;

if (localStorage.getItem('searches')){
    var searches = JSON.parse(localStorage.getItem('searches'));
//  document.querySelector('.cities').innerHTML += searches;
}else{
    var searches = [];
}

submit.addEventListener('click', function(){
    var Request = new XMLHttpRequest();
    Request.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q='+ input.value +'&mode=json&appid=41fc8ca598f3a7d7ba154982bb7f9da1&units=imperial');
    Request.onload = function(){
        data = JSON.parse(Request.responseText);
        for(i=0; i<5; i++){
            $('.card').text(JSON.stringify(data.list[i]));
            };

            searches.push('<button>'+ input.value + '</button></br>');
           
            if(searches.length > 8){
            searches.shift();
            };
            var searches2 = JSON.stringify(searches);
            localStorage.setItem('searches', searches2);
            searches3 =JSON.parse(localStorage.getItem('searches'));
            document.querySelector('.cities').innerHTML += searches3;
            //'<button>'+ input.value + '</button></br>';
            

    };
    Request.send();

    

});






$(document).ready(function(){
	//variables
 	var city = "";
 	var url = "";
 	var temp =0;
 	var imgs = ['url("http://i.imgur.com/eI5KLUW.jpg")',
     						    'url("http://i.imgur.com/rG0P1ro.jpg")', 'url("http://i.imgur.com/voCuONs.jpg")',
						        'url("http://i.imgur.com/5tFHSKa.jpg")'];
    var temps = [32, 21, 0];
    if (navigator.geolocation) {//finding current location using geolocation
  		navigator.geolocation.getCurrentPosition(function(position) {
  			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			 url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=d9d209dbbace250d327dc573d25ff795";
			getJSON(url);
		});
	}else{
		$("p").text("Browser not compatible for fetching cuurrent location");
	}
 	$("#searchButton").click(function(e){//getting the weather data by entering data in field and search
		e.preventDefault();	//to prevent form getting submitted and thereby console getting refreshed
		city = $("#searchCity").val();
		if (city.replace(" ","") == "" ) {
			alert("Enter some text and try again");
		}
		url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d9d209dbbace250d327dc573d25ff795";	
			
			getJSON(url);
			city="";
		$("#searchCity").val(city);//emptying the search field
		
 	});
 	

	function backgroundImage(temp){

		if (temp >= temps[0]) {
      $('body').css('background-image', imgs[0]);
    } else if (temp < temps[0] && temp >= temps[1]) {
      $('body').css('background-image', imgs[1]);
    } else if (temp < temps[1] && temp >= temps[2]) {
      $('body').css('background-image', imgs[2]);
    } else if (temp < temps[2]) {
      $('body').css('background-image', imgs[3]);
    }
	}

	function getJSON(url){
		$.getJSON(url,function(data){//getting the json data from API
					
					var icon = data.weather[0].icon;
					var imageUrl = "http://openweathermap.org/img/w/" + icon +".png";
					var cityName = data.name;
					var temp = Math.round(data.main.temp - 272.15);//temperature in Celsius
					backgroundImage(temp);
    				var status = data.weather[0].description;
					$("img").attr("src", imageUrl);
					$("p").text(cityName + " " +temp + "C " + status);
				})
		//handling error
		.fail(function(jqXHR, textStatus, errorThrown) { alert('Request failed! No data found for this city.Try again ' ); 
		});
	}
 });



	


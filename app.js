$(document).ready( function() {
	
	 // input from City & State inputs	
	$('.weather-getter').submit( function(event){
		// zero out results if previous search has run
		$('.results').html('');
		// get the value of the tags the user submitted
		var city = $(this).find("input[name='city']").val();
		var state = $(this).find("select[name='state']").val();
		
		var urlResult = getURL(city, state);
		console.log(urlResult);
		getWeather(urlResult);
	});

   //  get input from PWS input
   $('.pws-getter').submit( function(event){
    	$('.results').html('');
    	var pws = $(this).find("input[name='pws']").val();
    	console.log('Hello' + pws);
      var urlResult2 = getURL2(pws);
      getWeather(urlResult2);

});


// Function to format URL for City and State
function getURL(city, state) {

var url = "";

 url =   "http://api.wunderground.com/api/3ca9d0b73a14c32b/conditions/q/" + state + "/" + city + ".json" ;
            
 console.log(url);
 return url;

}


// Function to format URL for PSW 

function getURL2(pws) {
var url = "";

url =   "http://api.wunderground.com/api/3ca9d0b73a14c32b/conditions/q/pws:" + pws + ".json" ;
console.log("PWS URL is " + url);
return url;

}

// this function takes the results from Weather Underground
// and creates new result to be appended to DOM

var showWeather = function (weather) {
	sweather = JSON.stringify(weather);
	console.log('This is the weather ' + sweather);
//alert('This is the answerers data ' + answerer.users);
// clone our result template code
	var result = $('.templates .weather').clone();
	
	
	var location = result.find('.location');
	location.text(weather.current_observation.display_location.full);
	
// Set the question properties in result
	var conditions = result.find('.weather');
	conditions.text(weather.current_observation.weather);

   var temp = result.find('.temp');
	temp.text(weather.current_observation.temperature_string);


  var humidity = result.find('.humidity');
	humidity.text(weather.current_observation.relative_humidity);

	var windSpeed = result.find('.windSpeed');
	windSpeed.text(weather.current_observation.wind_mph);

	var windDir = result.find('.windDir');
	windDir.text(weather.current_observation.wind_dir);


   return result;

};




// get Weather

var getWeather = function(url) {
	//alert('you got to the function');
	// the parameters we need to pass in our request to StackOverflow's API
	   //   alert('The url is ' + url);
	     
	
	var result = $.ajax({
		url: url,
		//data: request2,
		dataType: "jsonp",
		type: "GET",
		})
	.done(function(result){
		var result3 = JSON.stringify(result);
		console.log( "this is result 2" +result3);
	  // alert(result3.items.length);
		 
  //    alert('The url is ' + url);
 //     alert('the result is ' + new);		
	//	var searchResults2 = showSearchResults(topAnswers, result2.items.length);

//		$('.search-results').html(searchResults);
      // alert ("Test " + result3.current_observation.full);
	//$.each(result.current_observation, function(i, current_observation) {
			var weather = showWeather(result);
		
			$('.results').append(weather);
	//	});
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
};


});

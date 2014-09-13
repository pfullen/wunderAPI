$(document).ready( function() {
	$('.weather-getter').submit( function(event){
		// zero out results if previous search has run
		$('.results').html('');
		// get the value of the tags the user submitted
		var city = $(this).find("input[name='city']").val();
		var state = $(this).find("select[name='state']").val();
		alert(city + ", " + state);
		var urlResult = getURL(city, state);
		console.log(urlResult);
		getWeather(urlResult);
	});
	
	
	//  Get Top Top Answers
	
	$('.inspiration-getter').submit( function (event) {
		// zero out results if previous search has run
		$('results').html('');

	
		
		// get the value of the tags the user submitted
		var topAnswers = $(this).find("input[name = 'answerers']").val();

		var urlResult = getURL(topAnswers);
		//alert(topAnswers);
		
		getAnswerers(urlResult);
		
	});
	
	
});



function getURL(city, state) {

var url = "";

 url =   "http://api.wunderground.com/api/3ca9d0b73a14c32b/conditions/q/" + state + "/" + city + ".json" ;
            
 
 console.log(url);
 return url;


}






// this function takes the question object returned by StackOverflow 
// and creates new result to be appended to DOM
var showQuestion = function(question) {
	
	// clone our result template code
	var result = $('.templates .question').clone();
	
	// Set the question properties in result
	var questionElem = result.find('.question-text a');
	questionElem.attr('href', question.link);
	questionElem.text(question.title);

	// set the date asked property in result
	var asked = result.find('.asked-date');
	var date = new Date(1000*question.creation_date);
	asked.text(date.toString());

	// set the #views for question property in result
	var viewed = result.find('.viewed');
	viewed.text(question.view_count);

	// set some properties related to asker
	var asker = result.find('.asker');
	asker.html('<p>Name: <a target="_blank" href=http://stackoverflow.com/users/' + question.owner.user_id + ' >' +
													question.owner.display_name +
												'</a>' +
							'</p>' +
 							'<p>Reputation: ' + question.owner.reputation + '</p>'
	);

	return result;
};


// this function takes the Answerers object returned by StackOverflow 
// and creates new result to be appended to DOM

var showWeather = function (weather) {
	//sAnswerer = JSON.stringify(answere);
	//console.log(sAnswerer);
//alert('This is the answerers data ' + answerer.users);
// clone our result template code
	var result = $('.templates .weather').clone();
	
	
	var location = result.find('.location');
	location.text(weather.current_observation.display_location.full);
	
// Set the question properties in result
	var conditions = result.find('.weather');
	conditions.text(weather.current_observation.conditions.weather);

   var temp = result.find('.temp');
	temp.text(weather.current_observation.temperature_string);


  var humidity = result2.find('.humidity');
	humidity.text(weather.current_observation.relative_humidity);

	var windSpeed = result2.find('.windSpeed');
	windSpeed.text(weather.current_observation.wind_mph);

	var windDir = result2.find('.windDir');
	windDir.text(weather.current_observation.wind_dir);


   return result;

};










// this function takes the results object from StackOverflow
// and creates info about search results to be appended to DOM
var showSearchResults = function(query, resultNum) {
	var results = resultNum + ' results for <strong>' + query;
	return results;
};

// takes error string and turns it into displayable DOM element
var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};

// takes a string of semi-colon separated tags to be searched
// for on StackOverflow
var geta = function(tags) {
	alert('you made it to this function');
	// the parameters we need to pass in our request to StackOverflow's API
		var request = {tagged: tags,
							site: 'stackoverflow' ,
								order: 'desc',
								sort: 'creation'
							
						};
					var Newrequest = JSON.stringify(request);
	console.log('The request is ' + Newrequest );
	var result = $.ajax({
		
	url: "http://api.stackexchange.com/2.2/questions/unanswered",
		data: request,
		dataType: "jsonp",
		type: "GET", 
		})	
	.done(function(result){
		var searchResults = showSearchResults(request.tagged, result.items.length);
      var newResult =  JSON.stringify(result);     

      console.log(newResult);
		$('.search-results').html(searchResults);

		$.each(result.items, function(i, item) {
			var question = showQuestion(item);
			$('.results').append(question);
		});
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
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
		$.each(result.current_observation, function(i, current_observation) {
			var weather = showWeather(current_observation);
		
			$('.results').append(weather);
		});
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
};




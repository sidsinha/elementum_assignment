app.factory('MovieDetailService', 
	function($http, globalService) {
		
		var APIMovieDetails = {};
		
		APIMovieDetails.getAPIMovieDetails = function(movie_id) {
			
			// $http returns a promise, which has a then function, which also returns a promise
	  		var url = globalService.apiBase + '/movie/' + movie_id + '?api_key=' + globalService.apiKey + '&callback='+globalService.apiCallback;
			
	  		var promise = $http.jsonp(url).then(function (data) {
		  		
				var getMovieData = data.data;
		  		
				// The return value gets picked up by the then in the controller.
        		return getMovieData;
      		});
			// Return the promise to the controller
			return promise;
		}
		return APIMovieDetails;
	}
);
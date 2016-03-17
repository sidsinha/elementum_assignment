app.factory('MovieCollectionService', 
	function($http, globalService) {
		
		var APIMovieCollection = {};
		
		APIMovieCollection.getAPIMovieCollection = function() {
			
			// $http returns a promise, which has a then function, which also returns a promise
	  		var url = globalService.apiBase + globalService.apiCollectionSevice + '?api_key=' + globalService.apiKey + '&callback='+globalService.apiCallback;
			
	  		var promise = $http.jsonp(url).then(function (data) {
		  		
				var getMovieCollection = data.data.parts;
				
				var getColectionData = [];
				angular.forEach(getMovieCollection,
					function(item) {
						getColectionData.push(item);
					}
				);
				
				// The return value gets picked up by the then in the controller.
        		return getMovieCollection;
      		});
			// Return the promise to the controller
			return promise;
		}
		
		return APIMovieCollection;
	}
);
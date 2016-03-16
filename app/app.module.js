var app = angular.module('mainModule', []);

app
    .controller(
        'mainController',
        function($scope, $http, CustomGlobalVaraible) {

            //global declaration for image link
            $scope.CustomImgLink = CustomGlobalVaraible.imgLink;

            //function to pop image onclick
            $scope.showImage = function(img) {
                $scope.castImage = CustomGlobalVaraible.imgLink + img;
            }
			
			//calling collection api for getting all movie list
            var service = '/collection/528';
            var url = CustomGlobalVaraible.apiBase + service + '?api_key=' + CustomGlobalVaraible.apiKey + '&callback=JSON_CALLBACK';

            $scope.result = 'requesting...';

            $http
                .jsonp(url)
                .then(
                    function(data, status, headers, config) {
                        $scope.movieList = data.data.parts;

                        var getMovieData = [];
                        angular.forEach($scope.movieList,
                                function(item) {
                                    getMovieData
                                        .push(item);
                                })
						
                        
						$scope.movieDefaultId = getMovieData[0].id;//getting default movie id (i.e., 1st)
                        $scope.movieCollection = getMovieData;
						//alert(JSON.stringify(getMovieData));
						$scope.changeView($scope.movieDefaultId);// calling funtion on pageload to show default movie
												
                    },
                    function(data, status) {
                        $scope.result = 'Maybe you missed your API key?\n\n' + JSON.stringify(data);
                        alert('error');
                    }
                );
		
            //calling api for getting movie information, after click on movie poster
            $scope.changeView = function(id) {
				
				var service = '/movie/' + id;
                var serviceCredit = '/movie/' + id + '/credits';
	            var url = CustomGlobalVaraible.apiBase + service + '?api_key=' + CustomGlobalVaraible.apiKey + '&callback=JSON_CALLBACK';
				var urlCredit = CustomGlobalVaraible.apiBase + serviceCredit + '?api_key=' + CustomGlobalVaraible.apiKey + '&callback=JSON_CALLBACK';
                
				$scope.result = 'requesting...';

                //http request for getting movie data
                $http
                    .jsonp(url)
                    .then(
                        function(data, status, headers, config) {
                            $scope.movieDetails = data.data;
                            // alert(JSON.stringify(data));
                        },
                        function(data, status) {
                            $scope.result = 'Maybe you missed your API key?\n\n' + JSON.stringify(data);
                            alert('error');
                        });
				 //alert(CustomGlobalServiceHTTP.data);
                //http request for getting crew and cast list
                $http
                    .jsonp(urlCredit)
                    .then(
                        function(data, status, headers, config) {

                            // getting list of crew
                            $scope.movieCrewCredit = data.data.crew;
                            var getCreditDataCrew = [];
                            angular.forEach(
                                $scope.movieCrewCredit,
                                function(item) {
                                    getCreditDataCrew
                                        .push(item);
                                })
                            var WriterList = [];
                            for (var index = 0; index < getCreditDataCrew.length; index++) {
                                if (getCreditDataCrew[index].job == 'Director') {
                                    $scope.DirectorName = getCreditDataCrew[index].name;
                                }
                                if (getCreditDataCrew[index].job == 'Writer') {
                                    WriterList
                                        .push(getCreditDataCrew[index].name);
                                }
                                $scope.WriterList = WriterList;
                            }

                            // getting list of cast
                            $scope.movieCastCredit = data.data.cast;
                            var getCreditDataCast = [];
                            angular.forEach(
                                $scope.movieCastCredit,
                                function(item) {
                                    getCreditDataCast
                                        .push(item);
                                })
                            var CastList = [];

                            for (var index = 0; index < getCreditDataCast.length; index++) {
                                CastList
                                    .push(getCreditDataCast[index].name);
                            }
                            $scope.CastList = CastList;

                            $scope.CastFullList = getCreditDataCast;
							
							$scope.castDefaultImage = getCreditDataCast[0].profile_path;
							$scope.showImage($scope.castDefaultImage);// calling funtion on pageload to show default cast image

                        },
                        function(data, status) {
                            $scope.result = 'Maybe you missed your API key?\n\n' + JSON.stringify(data);
                            alert('error');
                        });

                $scope.template = "view/movie-details.html";
            }

		

        });

app.factory('movieCreditService', function($http, CustomGlobalVaraible) {
	
	var movieCollectionService = {
    	async: function() {
		
	  	// $http returns a promise, which has a then function, which also returns a promise
	  	var url = CustomGlobalVaraible.apiBase+'/collection/528?api_key='+CustomGlobalVaraible.apiKey+'&callback=JSON_CALLBACK';
	  	var promise = $http.jsonp(url).then(function (data) {
		  
			var getData = data.data.crew;
		  	var getMovieData = [];
			angular.forEach(getData,
				function(item) {
					getMovieData.push(item);
				}
			);
			var movieDefaultId = getMovieData[0].id;//getting default movie id (i.e., 1st)
			//changeView(movieDefaultId);// calling funtion on pageload to show default movie
		// The return value gets picked up by the then in the controller.
        return getMovieData;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return movieCollectionService;
});


app.factory('CustomGlobalVaraible', function() {
    return {
        imgLink: 'http://image.tmdb.org/t/p/w370/',
        apiBase: 'http://api.themoviedb.org/3',
        apiKey: '51ff67690c0230da31ab31af8dba8b45'
    };
});
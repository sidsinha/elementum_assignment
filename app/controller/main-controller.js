var app = angular.module('mainModule', []);

app.controller('mainController',
        
		function($scope, $http, globalService, MovieDetailService, MovieCollectionService) {

 			//global declaration for image link
            $scope.CustomImgLink = globalService.imgLink;

            //function to pop image onclick
            $scope.showImage = function(img) {
                $scope.castImage = globalService.imgLink + img;
            }
			
			//getting movie collection by calling 'MovieCollectionService' service (i.e., app/services/movie-collection.js)
			$scope.movieCollection = MovieCollectionService.getAPIMovieCollection();
			$scope.changeView(218);// calling funtion on pageload to show default movie
						
			//function called for getting movie information, after click on movie poster
            $scope.changeView = function(id) {
				
				//getting movie details by calling 'MovieDetailService' service (i.e., app/services/movie-details.js)
				$scope.movieDetails = MovieDetailService.getAPIMovieDetails(id);
				
				//http request for getting crew and cast list
				var urlCredit = globalService.apiBase + '/movie/' + id + '/credits' + '?api_key=' + globalService.apiKey + '&callback='+globalService.apiCallback;
                $http.jsonp(urlCredit)
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
                            $scope.result = globalService.responseMsg_ApiError + JSON.stringify(data);
                            alert('error');
                        });

                $scope.template = "view/movie-details.html";
            }
		}
);
app.factory('globalService', function() {
    return {
        imgLink: 'http://image.tmdb.org/t/p/w370/',
		
        apiBase: 'http://api.themoviedb.org/3',
		
        apiKey: '51ff67690c0230da31ab31af8dba8b45',
		
		apiCollectionSevice: '/collection/528',
		
		apiCallback: 'JSON_CALLBACK',
		
		responseMsg_ApiError: 'Maybe you missed your API key?'
    };
});
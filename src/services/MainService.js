(function() {
	angular.module('365scoreApp')
	.service('MainService', function($http){

		return {
			'getGames': function(){
				return $http.get('http://mobilews.365scores.com/Data/Games/?lang=1&uc=6&tz=15&countries=1');
			},
			'getChanges': function(lastUpdateID){
				return $http.get('http://mobilews.365scores.com/Data/Games/?lang=1&uc=6&tz=15&countries=1&UID=' + lastUpdateID);
			}
		}
	})
	
})();
(function() {
	'use strict';

	angular.module('365scoreApp')
	.controller('MainCtrl', ['$scope', 'MainService', '$interval', function($scope, MainService, $interval){

		$scope.games = {};
		$scope.competitions = [];
		$scope.countries = [];
		$scope.lastUpdateID = null;
		$scope.currentDate = null;
		$scope.toggleMenu = false;

		// initial function, gets all games, competitions and countries
		function init() {
			MainService.getGames().then(function(response){
				var allGames = response.data.Games;
				$scope.competitions = response.data.Competitions;
				$scope.countries = response.data.Countries;
				$scope.lastUpdateID = response.data.LastUpdateID;
				var dateString = response.data.CurrentDate.split('-');
				$scope.currentDate = new Date(dateString[2], dateString[1] - 1, dateString[0]);

				structureGames(allGames);
			});
		}
		
		init();

		// grouping the games by competitions
		var structureGames = function(allGames) {
			angular.forEach(allGames, function(game, value){
				var compId = game.Comp;
				var competition = $scope.competitions.filter(function(obj) {
				  	return obj.ID == compId;
				});
				game.date = game.STime.split(" ");

				if (!$scope.games[compId]) {
					$scope.games[compId] = {
						compName: competition[0].Name,
						countryId: competition[0].CID,
						gamesList: []
					};
				}
				if (!$scope.games[compId].gamesList) {
					$scope.games[compId].gamesList = [];
					$scope.games[compId].gamesList.push(game);
				}
				else {
					$scope.games[compId].gamesList.push(game);
				}
			});
		};

		// update games data on every 5 sec
		$interval(updateGames, 5000);

		function updateGames() {
			MainService.getChanges($scope.lastUpdateID).then(function(response){
				console.log(response.data);
				$scope.lastUpdateID = response.data.LastUpdateID;

				// check if game changes occured
				if (response.data.Games) {
					var updatedGames = response.data.Games;
					for (var i = 0; i < updatedGames.length; i++) {
						var compId = updatedGames[i].Comp;
						var existingGame;
						angular.forEach($scope.games[compId].gamesList, function(game, index){
							if (updatedGames[i].ID === game.ID) {

								// update specific game
								angular.forEach(updatedGames[i], function(newValue, newKey){
									angular.forEach($scope.games[game.Comp].gamesList[index], function(value, key){
										if (newKey == key && newValue !== value) {
											console.log($scope.games[game.Comp].gamesList[index][key], updatedGames[i][newKey]);
											$scope.games[game.Comp].gamesList[index][key] = updatedGames[i][newKey];
										}
									});
								});
								existingGame = true;
								console.log("update");
							}
						});
						// add new game
						if (!existingGame) {
							$scope.games[compId].gamesList.push(updatedGames[i]);
							console.log("new");
						}
					}					
				}
			});
		}		
	}]);
	
})();
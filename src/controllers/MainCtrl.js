(function() {
	'use strict'

	angular.module('365scoreApp')
	.controller('MainCtrl', function($scope, MainService, $interval){

		$scope.games = {};
		$scope.competitions;
		$scope.countries;
		$scope.lastUpdateID = null;

		function init() {
			MainService.getGames().then(function(response){
				$scope.allGames = response.data["Games"];
				$scope.competitions = response.data["Competitions"];
				$scope.countries = response.data["Countries"];
				$scope.lastUpdateID = response.data["LastUpdateID"]

				structureGames($scope.allGames);
			});
		}
		
		init();

		var structureGames = function(allGames) {
			angular.forEach($scope.allGames, function(game, value){
				var compId = game.Comp;
				var competition = $scope.competitions.filter(function(obj) {
				  	return obj.ID == compId;
				});

				if (!$scope.games[compId]) {
					$scope.games[compId] = {
						compName: competition[0]["Name"],
						countryId: competition[0]["CID"],
						gamesList: []
					};
				}
				
				game.date = game.STime.split(" ");

				// TODO don't push if already exists!
				if (!$scope.games[compId].gamesList) {
					$scope.games[compId].gamesList = [];
					$scope.games[compId].gamesList.push(game);
				}
				else {
					$scope.games[compId].gamesList.push(game);
				}
			});
		}

		// update games data on every 5 sec
		$interval(updateGames, 5000);

		function updateGames() {
			MainService.getChanges($scope.lastUpdateID).then(function(response){
				console.log(response.data);
				$scope.lastUpdateID = response.data.LastUpdateID;
				if (response.data.Games) {
					var updatedGames = response.data.Games;
					for (var i = 0; i < updatedGames.length; i++) {
						angular.forEach($scope.allGames, function(game){
							if (updatedGames[i].ID === game.ID) {
								console.log(updatedGames[i].ID, game);
								game = updatedGames[i];
								angular.forEach($cope.games[game.Comp], function(game2) {
									var givenGame = $cope.games[game.Comp].filter(function(obj) {
									  	return obj.ID == compId;
									});
									// TODO don't update everything
								}
							}
						})
					}
					init($scope.allGames);					
				}
			});
		}
		
	})
	
})();
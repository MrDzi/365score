(function() {
	angular.module('365scoreApp', [])
		.config(function($compileProvider){
			$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|app):/);
		});
})();
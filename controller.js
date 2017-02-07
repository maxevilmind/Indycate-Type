angular.module('HelloWorldApp', [])
   .controller('HelloWorldController', function($scope) {
      	const {ipcRenderer} = require('electron')
      	var remote = require('electron').remote; 

      	ipcRenderer.on('file-loaded', (event, arg) => {
	        console.log(arg) // prints "pong"
	        $scope.text = arg;
	        $scope.$apply();
	        //text = remote.getGlobal('text')['text-val'];
      });
});
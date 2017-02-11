angular.module('HelloWorldApp', [])
   .controller('HelloWorldController', function($scope) {
      	const {ipcRenderer} = require('electron')
      	var remote = require('electron').remote; 

      	ipcRenderer.on('file-loaded', (event, arg) => {
	        console.log(arg)
	        $scope.text = arg;
	        $scope.$apply();
      	});
      	ipcRenderer.on('file-save-request', (event, arg) => {
      		console.log("got file-save-request");
	        ipcRenderer.send('file-save-request', $scope.text);
      	});
	});
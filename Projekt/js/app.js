var myApp = angular.module('myApp', ['ngCordova', 'ionic', 'pubnub.angular.service', 'ngNotify']);

myApp.value('currentUser', Math.random(1000000).toString());

myApp.run(['Pubnub', 'currentUser', function(Pubnub, currentUser) {
  Pubnub.init({
    publish_key: 'pub-c-9ded1149-0d94-4941-af4b-1eac63c501b0',
    subscribe_key: 'sub-c-140f0530-3589-11e7-b860-02ee2ddab7fe',
    uuid: currentUser

  });
}]);

myApp.run(['ngNotify', function(ngNotify) {
  ngNotify.config({
      theme: 'paster',
      position: 'top',
      duration: 250
  });

}]);


/*myApp.config(['$routeProvider',
function($routeProvider) {
    $routeProvider.
  when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'MainCtrl'
    }).
  otherwise('/home', {
      templateUrl: 'partials/home.html',
      controller: 'MainCtrl'
    });
}]);*/

myApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/home', 
    //If in a folder, template/welcome.html    
    templateUrl: 'partials/home.html',
      controller: 'MainCtrl'
  })

  $urlRouterProvider.
  otherwise("/home", {
    templateUrl: 'partials/home.html',
    controller: 'MainCtrl'
  });
})
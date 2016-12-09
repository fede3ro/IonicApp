angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('SearchCtrl', function($http, $scope, $ionicPopup) {
    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: $scope.search,
        template: ''
      });

      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };
})


.controller('PlaylistsCtrl', function($http, $scope) {
  $http.get("http://it.horoscopofree.com/rss/horoscopofree-it.rss")
    .success(function (data) {
      var x2js = new X2JS();
      var json = x2js.xml_str2json(data);

      //console.log('title'+json.rss.channel.item[0].title);
      //console.log('title'+json.rss.channel.item[0].description);

      $scope.playlists = [];

      for (var i = 0; i < json.rss.channel.item.length; i++) {
        $scope.playlists.push({id: i , title: json.rss.channel.item[i].title});
      }

  });

})


.controller('PlaylistCtrl', function($http, $scope, $stateParams) {
  $http.get("http://it.horoscopofree.com/rss/horoscopofree-it.rss")
    .success(function (data) {
      var x2js = new X2JS();
      var json = x2js.xml_str2json(data);

      var title = json.rss.channel.item[$stateParams.playlistId].title;
      var desc = json.rss.channel.item[$stateParams.playlistId].description;
      desc = desc.substring(0 ,desc.length - 111);

      $scope.description = desc;
      $scope.title = title;

  });

});

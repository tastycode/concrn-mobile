angular.module('main')
.controller('DetailCtrl', function ($scope, $state, $stateParams, ConcrnClient, ionicMaterialInk, $cordovaCamera,
$cordovaDialogs) {
  ionicMaterialInk.displayEffect();
  $scope.urgencyValues = [
    {id: 0, label: 'Not urgent'},
    {id: 4, label: 'Within an hour'},
    {id: 5, label: 'Need help now'}
  ];
  $scope.genderValues = ['Male', 'Female', 'Other'];
  $scope.ageValues = ['Youth (0-17)', 'Young Adult (18-34)', 'Adult (35-64)', 'Senior (65+)'];
  $scope.raceValues = ['Hispanic or Latino',
                      'American Indian or Alaska Native',
                      'Asian',
                      'Black or African American',
                      'Native Hawaiian or Pacific Islander',
                      'White',
                      'Other/Unknown'];
  $scope.report = {
    photo: null,
    urgency: 3,
  };

  $scope.takePhoto = function() {
    var options = {
      quality: 90,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      targetWidth: 1024,
      targetHeight: 768,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };
    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.report.photo = 'data:image/jpeg;base64,' + imageData;
    }, function(err) {
      console.warn('Error in getPicture ', err);
    });
  };

  $scope.isUrgency = function(urgencyObject) {
    return $scope.report.urgency === urgencyObject.id;
  }

  $scope.setUrgency = function(urgencyObject) {
    if (urgencyObject.id === 5) {
      $cordovaDialogs.alert('If you need help immediately, please call 911');
    }
    $scope.report.urgency = urgencyObject.id;
  }

  $scope.isGender = function(o) {
    return $scope.report.gender === o;
  }

  $scope.setGender = function(o) {
    $scope.report.gender = o;
  }

  $scope.finishReport = function () {
    var observations = $scope.report.observations ? $scope.report.observations.join(',') : '';

    ConcrnClient.reportCrisis({
      lat: $stateParams.lat,
      lng: $stateParams.lng,
      address: $stateParams.address
    }).then(function(report) {
      ConcrnClient.updateReport(report.id, {
        report: {
          image: $scope.report.photo,
          observations: observations,
          urgency: $scope.report.urgency,
          age: $scope.report.age,
          gender: $scope.report.gender,
          setting: $scope.report.setting,
          nature: $scope.report.nature
        }
      }).then(function() {
        //failure handler for if the report update with extra info fails
        $cordovaDialogs.alert('Your report has been made. You will receive a text when a responder is on the way.')
      });
    }, function() {
      //failure handler for if the main report fails
        $cordovaDialogs.alert('Your report failed to send. Please contact support@concrn.com')
    });
    $state.go('main.map');
    mixpanel.track('Report Sent', {
      is_image_attached: !!$scope.report.image,
      urgency: $scope.report.urgency,
      gender: $scope.report.gender,
      age: $scope.report.age,
      nature: $scope.report.nature
    })
  };
});

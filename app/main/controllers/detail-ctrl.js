angular.module('main')
.controller('DetailCtrl', function ($scope, $state, $stateParams, ConcrnClient, ionicMaterialInk) {
  ionicMaterialInk.displayEffect();
  $scope.urgencyValues = [
    {id: 1, label: 'Not urgent'},
    {id: 2, label: 'This week'},
    {id: 3, label: 'Today'},
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
  $scope.settingValues = ['Public Space', 'Workplace', 'School', 'Home', 'Other'];
  $scope.observationValues = ['At risk of harm', 'Under the influence', 'Anxious', 'Depressed', 'Aggravated', 'Threatening'];

  $scope.report = {
    id: $stateParams.id,
    photo: null,
    urgency: 1,
  };

  $scope.finishReport = function () {
    ConcrnClient.updateReport($scope.report.id, {
      report: {
        image: $scope.report.photo,
        observations: $scope.report.observations.join(','),
        urgency: $scope.report.urgency,
        age: $scope.report.age,
        gender: $scope.report.gender,
        setting: $scope.report.setting,
        nature: $scope.report.nature
      }
    }).then(function() {
      $state.go('main.map');
    });
  };
});

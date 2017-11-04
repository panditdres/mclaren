(function () {
    angular.module('McLarenApp', [
        'ui.router',
        'ui.bootstrap',
        'ngStorage',
        'angular-loading-bar',
        'ngMessages',
        'ngFileSaver',
        'ngToast',
        'chart.js'
    ])
        .config(function appConfig($logProvider, $compileProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider) {
            $urlRouterProvider.otherwise('/');
            $logProvider.debugEnabled(false);
            $locationProvider.html5Mode(true);
            cfpLoadingBarProvider.includeSpinner = false;
            $compileProvider.debugInfoEnabled(false);
        })

        .controller('AppCtrl', function AppCtrl($scope, $localStorage, $location, $sessionStorage) {

            let token = $location.search().SessionID;
            if (token) $localStorage.token = token;

            $sessionStorage.$reset(); // clear storage

            $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (angular.isDefined(toState.data.pageTitle)) {
                    $scope.pageTitle = toState.data.pageTitle + " | McLaren";
                }
            })
        })
})();

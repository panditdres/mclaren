(function () {
    "use strict";
    angular.module("McLarenApp")
        .config(function config($stateProvider) {
            $stateProvider
                .state('home', {
                    // url: '/',
                    controller: 'HomeCtrl as vm',
                    templateUrl: 'app/home/home.html',
                    data: {pageTitle: 'Dashboard'},
                    resolve: {
                        allPatients : function(DataService){
                            return DataService.getAllPatients()
                            .then(res => {
                                // console.log(res.data)
                                return res.data
                            })
                        }, 
                        allDefinitions : function(DataService){
                            return DataService.getAllDefinitions()
                            .then(res => {
                                // console.log(res.data)
                                return res.data
                            })
                        }
                    }
                })
        })

        .controller('HomeCtrl', function ($scope, $localStorage, $state, DataService, allPatients, allDefinitions) {

            let vm = this;

            init();

            // initialization - home is the parent and we can use allPatients and allDefinitions to pass to the children
            function init(){
                vm.patients     = allPatients;
                vm.definitions  = allDefinitions;
            }
            

        })
}());
/**
 * Created by Pandit on 02-11-2017
 */
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
                                console.log(res.data)
                                return res.data
                            })
                        }, 
                        allDefinitions : function(DataService){
                            return DataService.getAllDefinitions()
                            .then(res => {
                                console.log(res.data)
                                return res.data
                            })
                        }
                    }
                })
        })

        .controller('HomeCtrl', function ($scope, $localStorage, $state, DataService, allPatients, allDefinitions) {

            let vm = this;

            vm.selectingCover = true;

            init();

            function init(){
                vm.patients     = allPatients;
                vm.definitions  = allDefinitions;
                console.log(allDefinitions)
            }
            

        })
}());
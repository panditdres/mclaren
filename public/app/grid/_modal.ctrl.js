/**
 * Created by Pandit on 02-11-2017
 */

"use strict";
angular.module("McLarenApp")
/* Add User Modal */
    .controller('ModalCtrl', function ($scope, $uibModalInstance, DataService, ngToast) {
        let vm = this;
        $scope.modal = $uibModalInstance;

        init();

        ///////////////////////////////////////////////////////////////////////////////////

        function init() {
            console.log('Modal created')
            vm.patient          = $scope.$resolve.obj.patient;
            vm.definitions      = $scope.$resolve.obj.definitions;

            vm.patient.summary.forEach(el => {
                el.activity = el.activity.replace(/\b\w/g, l => l.toUpperCase())
            })

            vm.labels           = vm.patient.summary.map(el => { return el.activity });
            vm.data             = vm.patient.summary.map(el => { return el.minutes });
            vm.chartOptions     = { cutoutPercentage: 70 };

            vm.moderateTotal    = vm.patient.moderateTotal
            vm.vigorousTotal    = vm.patient.vigorousTotal

            if(vm.moderateTotal >= 150 && vm.vigorousTotal === 0){
                vm.resultText = 'Patient falls under the category of 150 minutes of moderate activity';
            } else if (vm.vigorousTotal >= 75 && vm.moderateTotal === 0){
                vm.resultText = 'Patient falls under the category of 75 minutes of vigorous activity';
            } else {
                vm.resultText = 'Patient falls under the category of a mix of moderate and vigorous activity';
            }

        }
        

        
    })

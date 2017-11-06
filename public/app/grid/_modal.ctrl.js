"use strict";
angular.module("McLarenApp")
    .controller('ModalCtrl', function ($scope, $uibModalInstance, DataService, ngToast) {
        let vm = this;
        $scope.modal = $uibModalInstance;

        init();

        ///////////////////////////////////////////////////////////////////////////////////

        function init() {
            console.log('Modal created')

            // Get the patient and definitions passed from grid.js when modal was created
            vm.patient          = $scope.$resolve.obj.patient;
            vm.definitions      = $scope.$resolve.obj.definitions;

            // Get patient's age
            vm.age              = getAge(moment(vm.patient.birthDate).format('YYYY-MM-DD'));

            // Capitalise the activities
            vm.patient.summary.forEach(el => {
                el.activity = el.activity.replace(/\b\w/g, l => l.toUpperCase())
            })

            // Options for the doughnut chart
            // Library used for chart - http://jtblin.github.io/angular-chart.js/
            vm.labels           = vm.patient.summary.map(el => { return el.activity });
            vm.data             = vm.patient.summary.map(el => { return el.minutes });
            vm.chartOptions     = { cutoutPercentage: 70 };

            vm.moderateTotal    = vm.patient.moderateTotal
            vm.vigorousTotal    = vm.patient.vigorousTotal

            // Mapping in which category each patient falls under
            if(vm.moderateTotal >= 150 && vm.vigorousTotal === 0){
                vm.resultText = 'Patient falls under the category of 150 minutes of moderate activity';
            } else if (vm.vigorousTotal >= 75 && vm.moderateTotal === 0){
                vm.resultText = 'Patient falls under the category of 75 minutes of vigorous activity';
            } else if (vm.vigorousTotal != 0 && vm.moderateTotal != 0) {
                vm.resultText = 'Patient falls under the category of a mix of moderate and vigorous activity';
            } else {
                vm.resultText = 'Patient lacks activity';
            }
        }

        // Using moment to get the age of a patient
        function getAge(string){
            return moment().diff(string, 'years');
        }
        
    })

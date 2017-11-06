
(function () {
    "use strict";
    angular.module("McLarenApp")
        .config(function config($stateProvider) {
            $stateProvider
                .state('home.grid', {
                    url: '/',
                    controller: 'GridCtrl as vm',
                    templateUrl: 'app/grid/grid.html',
                    data: {pageTitle: 'Dashboard'}

                })
        })

        .controller('GridCtrl', function ($scope, $state, $uibModal, $filter, $rootScope, DataService) {

            let vm = this;

            // Variables declaration
            // Default sorting for the table is name
            vm.search       = '';
            vm.sortCol      = 'name';
            vm.checkboxAll  = false;
            vm.pageNum      = 1;
            vm.sortReverse  = false;
            vm.pplPerPage   = 10;

            // Function declaration
            vm.pagePatients = pagePatients;
            vm.viewPatient  = viewPatient;

            // Declaring the columns on the table/grid
            vm.gridColumns = [
                {display: 'Name', search: 'name', sort: 'name', rotate: 'name'},
                {display: 'BMI', search: 'bmi', sort: 'bmi', rotate: 'bmi'},
                {display: 'Height (cm)', search: 'heightCm', sort: 'heightCm', rotate: 'heightCm'},
                {display: 'Weight (kg)', search: 'weightKg', sort: 'weightKg', rotate: 'weightKg'},
                {display: 'Category', search: 'resultText', sort: 'resultText', rotate: 'resultText'},
                {display: 'Created', search: 'Created', sort: 'Created', rotate: 'Created'}
            ];

            init();

            ///////////////////////////////////////////////////////////////////////////////////


            function init(){

                // Retrieve data from DataService
                vm.patients     = DataService.patients();
                vm.definitions  = DataService.definitions();

                // Filtering to have all the vigorous and moderate activities
                let vigorousAct = vm.definitions.filter(el => { return el.intensity === 'vigorous' }).map(x => { return x.activity });
                let moderateAct = vm.definitions.filter(el => { return el.intensity === 'moderate' }).map(x => { return x.activity });

                vm.patients.forEach(patient => {

                    // For each patient, we want to know the total amount of minutes they have done for moderate activities
                    patient.moderateTotal = patient.summary.filter(el => {
                        return moderateAct.includes(el.activity.toLowerCase())
                    }).map(x => { return x.minutes }).reduce((a,b) => a+b, 0);

                    // For each patient, we want to know the total amount of minutes they have done for vigorous activities
                    patient.vigorousTotal  = patient.summary.filter(el => {
                        return vigorousAct.includes(el.activity.toLowerCase())
                    }).map(x => { return x.minutes }).reduce((a,b) => a+b, 0);

                    // Mapping to determine which category each patients fall under
                    if(patient.moderateTotal >= 150 && patient.vigorousTotal === 0){
                        patient.resultText = '150 minutes of moderate activity';
                    } else if (patient.vigorousTotal >= 75 && patient.moderateTotal === 0){
                        patient.resultText = '75 minutes of vigorous activity';
                    } else if (patient.vigorousTotal != 0 && patient.moderateTotal != 0){
                        patient.resultText = 'Mix of moderate and vigorous activity';
                    } else {
                        patient.resultText = 'Lacks activity';
                    }
                })

            }

            // function displays the pagination to get patients per page
            function pagePatients() { // <-- filter patients for a page
                if (vm.patients) {
                    let filt = $filter('filter')(doSorting(vm.patients), vm.search);
                    let paged = filt.filter((el, i) => (i >= vm.pplPerPage * (vm.pageNum - 1)) && (i < vm.pageNum * vm.pplPerPage));
                    vm.pageLen = filt.length;
                    return paged
                }
            };

            function doSorting(list) {
                // temporary array holds objects with position and sort-value
                let mapped = list.map(function (el, i) {
                    return {index: i, value: el[vm.sortCol]};
                });
                // sorting the mapped array containing the reduced values
                mapped.sort(function (a, b) {
                    if (a.value > b.value) {
                        return vm.sortReverse ? -1 : 1;
                    }
                    if (a.value < b.value) {
                        return vm.sortReverse ? 1 : -1;
                    }
                    return 0;
                });
                // container for the resulting order
                return mapped.map(function (el) {
                    return list[el.index];
                });
            }

            // Opens the modal to view each patient's activity history
            function viewPatient(patient){
                const obj = {
                    patient     : patient,
                    definitions : vm.definitions
                };
                const options = {
                    templateUrl: "app/templates/modal.html", size: "lg", controller: "ModalCtrl as vm",
                    scope: $scope,
                    resolve: { obj }
                };
                $uibModal.open(options).result.then(resp => {
                    console.log('closed modal result returned')
                }, () => {
                    console.log('Modal dismissed')
                })
            };
              
        })
}());
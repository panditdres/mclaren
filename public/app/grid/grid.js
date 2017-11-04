/**
 * Created by Pandit on 02-11-2017
 */
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

            vm.search       = '';
            vm.sortCol      = 'name';
            vm.checkboxAll  = false;
            vm.pageNum      = 1;
            vm.sortReverse  = false;
            vm.pplPerPage   = 10;

            // Function declaration
            vm.pagePatients = pagePatients;
            vm.viewPatient  = viewPatient;


            vm.gridColumns = [
                {display: 'Name', search: 'name', sort: 'name', rotate: 'name'},
                {display: 'BMI', search: 'bmi', sort: 'bmi', rotate: 'bmi'},
                {display: 'Height (cm)', search: 'heightCm', sort: 'heightCm', rotate: 'heightCm'},
                {display: 'Weight (kg)', search: 'weightKg', sort: 'weightKg', rotate: 'weightKg'},
                {display: 'Meets recommended level', search: 'meetsBool', sort: 'meetsBool'},
                {display: 'Created', search: 'Created', sort: 'Created', rotate: 'Created'}
            ];

            init();

            ///////////////////////////////////////////////////////////////////////////////////


            function init(){
                vm.patients = DataService.patients();
                console.log(vm.patients,'patient on grid')
            }

            function pagePatients() { // <-- filter users for a page
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
                    // console.log(el)
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

            function viewPatient(patient){
                console.log('view patient',patient)
                const userModel = {
                    patientId: patient,
                };
                const options = {
                    templateUrl: "app/templates/modal.html", size: "lg", controller: "ModalCtrl as vm",
                    // scope: $scope,
                };
                $uibModal.open(options).result.then(resp => {
                    
                }, () => {
                    console.log('Modal dismissed')
                })
            };
            
            

        })
}());
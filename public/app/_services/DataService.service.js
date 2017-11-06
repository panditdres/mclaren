(function () {
    angular.module('McLarenApp').factory('DataService', dataFetch);

    function dataFetch($http, $q, $localStorage, ngToast) {
        const apiUrl = '/api/v1/';

        let patients    = [];
        let definitions = [];

        return {
           getAllPatients,
           getAllDefinitions,
           patients : () => patients,
           definitions : () => definitions
        };

        /****________********_______********________****/


        // Function to retrieve all patients stored in the database
        function getAllPatients() {
            return $http.get(apiUrl + 'allPatients')
            .then(resp => {
                patients = resp.data.data;
                return resp.data
            })
            .catch(err => {
                console.log(err)
            })
        }

        // Fuction to retrieve all definitions stored in the database
        function getAllDefinitions() {
            return $http.get(apiUrl + 'allDefinitions')
            .then(resp => {
                definitions = resp.data.data;
                return resp.data
            })
            .catch(err => {
                console.log(err)
            })
        }

    }
}());
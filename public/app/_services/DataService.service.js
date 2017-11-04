/**
 * Created by Pandit on 02-11-2017
 */
(function () {
    angular.module('McLarenApp').factory('DataService', dataFetch);

    function dataFetch($http, $q, $localStorage, ngToast) {
        const apiUrl = '/api/v1/';

        let patients = [];

        return {
           getAllPatients,
           getAllDefinitions,
           patients : () => patients
        };

        /****________********_______********________****/

        function getAllPatients() {
            // data.sessionId = $localStorage.token;
            return $http.get(apiUrl + 'allPatients')
            .then(resp => {
                patients = resp.data.data;
                return resp.data
            })
            .catch(err => {
                console.log(err)
            })
        }

        function getAllDefinitions() {
            // data.sessionId = $localStorage.token;
            return $http.get(apiUrl + 'allDefinitions')
            .then(resp => {
                // console.log(resp.data)
                return resp.data
            })
            .catch(err => {
                console.log(err)
            })
        }

    }
}());
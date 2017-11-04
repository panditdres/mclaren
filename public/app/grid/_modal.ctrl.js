/**
 * Created by Pandit on 02-11-2017
 */

"use strict";
angular.module("McLarenApp")
/* Add User Modal */
    .controller('ModalCtrl', function ($scope, $uibModalInstance, DataService, ngToast) {
        let vm = this;
        // console.log('Modal scope ', $scope);
        $scope.modal = $uibModalInstance;

        init();

        /****________********_______********________****/

        function init() {
            console.log('Modal created')
        }

        /****________********_______********________****/

       
    })

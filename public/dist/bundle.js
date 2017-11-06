"use strict";!function(){angular.module("McLarenApp",["ui.router","ui.bootstrap","ngStorage","angular-loading-bar","ngMessages","ngFileSaver","ngToast","chart.js"]).config(["$logProvider","$compileProvider","$urlRouterProvider","$locationProvider","cfpLoadingBarProvider",function(t,e,a,n,r){a.otherwise("/"),t.debugEnabled(!1),n.html5Mode(!0),r.includeSpinner=!1,e.debugInfoEnabled(!1)}]).controller("AppCtrl",["$scope","$localStorage","$location","$sessionStorage",function(t,e,a,n){t.$on("$stateChangeSuccess",function(e,a,n,r,i){angular.isDefined(a.data.pageTitle)&&(t.pageTitle=a.data.pageTitle+" | McLaren")})}])}(),angular.module("McLarenApp").controller("ModalCtrl",["$scope","$uibModalInstance","DataService","ngToast",function(t,e,a,n){function r(t){return moment().diff(t,"years")}var i=this;t.modal=e,function(){i.patient=t.$resolve.obj.patient,i.definitions=t.$resolve.obj.definitions,i.age=r(moment(i.patient.birthDate).format("YYYY-MM-DD")),i.patient.summary.forEach(function(t){t.activity=t.activity.replace(/\b\w/g,function(t){return t.toUpperCase()})}),i.labels=i.patient.summary.map(function(t){return t.activity}),i.data=i.patient.summary.map(function(t){return t.minutes}),i.chartOptions={cutoutPercentage:70},i.moderateTotal=i.patient.moderateTotal,i.vigorousTotal=i.patient.vigorousTotal,i.moderateTotal>=150&&0===i.vigorousTotal?i.resultText="Patient falls under the category of 150 minutes of moderate activity":i.vigorousTotal>=75&&0===i.moderateTotal?i.resultText="Patient falls under the category of 75 minutes of vigorous activity":0!=i.vigorousTotal&&0!=i.moderateTotal?i.resultText="Patient falls under the category of a mix of moderate and vigorous activity":i.resultText="Patient lacks activity"}()}]),function(){angular.module("McLarenApp").config(["$stateProvider",function(t){t.state("home.grid",{url:"/",controller:"GridCtrl as vm",templateUrl:"app/grid/grid.html",data:{pageTitle:"Dashboard"}})}]).controller("GridCtrl",["$scope","$state","$uibModal","$filter","$rootScope","DataService",function(t,e,a,n,r,i){function o(){if(s.patients){var t=n("filter")(l(s.patients),s.search),e=t.filter(function(t,e){return e>=s.pplPerPage*(s.pageNum-1)&&e<s.pageNum*s.pplPerPage});return s.pageLen=t.length,e}}function l(t){var e=t.map(function(t,e){return{index:e,value:t[s.sortCol]}});return e.sort(function(t,e){return t.value>e.value?s.sortReverse?-1:1:t.value<e.value?s.sortReverse?1:-1:0}),e.map(function(e){return t[e.index]})}function u(e){var n={patient:e,definitions:s.definitions},r={templateUrl:"app/templates/modal.html",size:"lg",controller:"ModalCtrl as vm",scope:t,resolve:{obj:n}};a.open(r).result.then(function(t){},function(){})}var s=this;s.search="",s.sortCol="name",s.checkboxAll=!1,s.pageNum=1,s.sortReverse=!1,s.pplPerPage=10,s.pagePatients=o,s.viewPatient=u,s.gridColumns=[{display:"Name",search:"name",sort:"name",rotate:"name"},{display:"BMI",search:"bmi",sort:"bmi",rotate:"bmi"},{display:"Height (cm)",search:"heightCm",sort:"heightCm",rotate:"heightCm"},{display:"Weight (kg)",search:"weightKg",sort:"weightKg",rotate:"weightKg"},{display:"Category",search:"resultText",sort:"resultText",rotate:"resultText"},{display:"Created",search:"Created",sort:"Created",rotate:"Created"}],function(){s.patients=i.patients(),s.definitions=i.definitions();var t=s.definitions.filter(function(t){return"vigorous"===t.intensity}).map(function(t){return t.activity}),e=s.definitions.filter(function(t){return"moderate"===t.intensity}).map(function(t){return t.activity});s.patients.forEach(function(a){a.moderateTotal=a.summary.filter(function(t){return e.includes(t.activity.toLowerCase())}).map(function(t){return t.minutes}).reduce(function(t,e){return t+e},0),a.vigorousTotal=a.summary.filter(function(e){return t.includes(e.activity.toLowerCase())}).map(function(t){return t.minutes}).reduce(function(t,e){return t+e},0),a.moderateTotal>=150&&0===a.vigorousTotal?a.resultText="150 minutes of moderate activity":a.vigorousTotal>=75&&0===a.moderateTotal?a.resultText="75 minutes of vigorous activity":0!=a.vigorousTotal&&0!=a.moderateTotal?a.resultText="Mix of moderate and vigorous activity":a.resultText="Lacks activity"})}()}])}(),function(){function t(t,e,a,n){function r(){return t.get(o+"allPatients").then(function(t){return l=t.data.data,t.data}).catch(function(t){})}function i(){return t.get(o+"allDefinitions").then(function(t){return u=t.data.data,t.data}).catch(function(t){})}var o="/api/v1/",l=[],u=[];return{getAllPatients:r,getAllDefinitions:i,patients:function(){return l},definitions:function(){return u}}}t.$inject=["$http","$q","$localStorage","ngToast"],angular.module("McLarenApp").factory("DataService",t)}(),function(){angular.module("McLarenApp").config(["$stateProvider",function(t){t.state("home",{controller:"HomeCtrl as vm",templateUrl:"app/home/home.html",data:{pageTitle:"Dashboard"},resolve:{allPatients:["DataService",function(t){return t.getAllPatients().then(function(t){return t.data})}],allDefinitions:["DataService",function(t){return t.getAllDefinitions().then(function(t){return t.data})}]}})}]).controller("HomeCtrl",["$scope","$localStorage","$state","DataService","allPatients","allDefinitions",function(t,e,a,n,r,i){var o=this;!function(){o.patients=r,o.definitions=i}()}])}();
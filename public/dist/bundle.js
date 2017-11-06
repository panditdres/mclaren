"use strict";!function(){angular.module("McLarenApp",["ui.router","ui.bootstrap","ngStorage","angular-loading-bar","ngMessages","ngFileSaver","ngToast","chart.js"]).config(["$logProvider","$compileProvider","$urlRouterProvider","$locationProvider","cfpLoadingBarProvider",function(t,e,a,r,i){a.otherwise("/"),t.debugEnabled(!1),r.html5Mode(!0),i.includeSpinner=!1,e.debugInfoEnabled(!1)}]).controller("AppCtrl",["$scope","$localStorage","$location","$sessionStorage",function(t,e,a,r){t.$on("$stateChangeSuccess",function(e,a,r,i,o){angular.isDefined(a.data.pageTitle)&&(t.pageTitle=a.data.pageTitle+" | McLaren")})}])}(),function(){function t(t,e,a,r){function i(){return t.get(n+"allPatients").then(function(t){return s=t.data.data,t.data}).catch(function(t){})}function o(){return t.get(n+"allDefinitions").then(function(t){return l=t.data.data,t.data}).catch(function(t){})}var n="/api/v1/",s=[],l=[];return{getAllPatients:i,getAllDefinitions:o,patients:function(){return s},definitions:function(){return l}}}t.$inject=["$http","$q","$localStorage","ngToast"],angular.module("McLarenApp").factory("DataService",t)}(),angular.module("McLarenApp").controller("ModalCtrl",["$scope","$uibModalInstance","DataService","ngToast",function(t,e,a,r){function i(t){return moment().diff(t,"years")}var o=this;t.modal=e,function(){o.patient=t.$resolve.obj.patient,o.definitions=t.$resolve.obj.definitions,o.age=i(moment(o.patient.birthDate).format("YYYY-MM-DD")),o.patient.summary.forEach(function(t){t.activity=t.activity.replace(/\b\w/g,function(t){return t.toUpperCase()})}),o.labels=o.patient.summary.map(function(t){return t.activity}),o.data=o.patient.summary.map(function(t){return t.minutes}),o.chartOptions={cutoutPercentage:70},o.moderateTotal=o.patient.moderateTotal,o.vigorousTotal=o.patient.vigorousTotal,o.moderateTotal>=150&&0===o.vigorousTotal?o.resultText="Patient falls under the category of 150 minutes of moderate activity":o.vigorousTotal>=75&&0===o.moderateTotal?o.resultText="Patient falls under the category of 75 minutes of vigorous activity":0!=o.vigorousTotal&&0!=o.moderateTotal?o.resultText="Patient falls under the category of a mix of moderate and vigorous activity":o.resultText="Patient lacks activity"}()}]),function(){angular.module("McLarenApp").config(["$stateProvider",function(t){t.state("home.grid",{url:"/",controller:"GridCtrl as vm",templateUrl:"app/grid/grid.html",data:{pageTitle:"Dashboard"}})}]).controller("GridCtrl",["$scope","$state","$uibModal","$filter","$rootScope","DataService",function(t,e,a,r,i,o){function n(){if(u.patients){var t=r("filter")(s(u.patients),u.search),e=t.filter(function(t,e){return e>=u.pplPerPage*(u.pageNum-1)&&e<u.pageNum*u.pplPerPage});return u.pageLen=t.length,e}}function s(t){var e=t.map(function(t,e){return{index:e,value:t[u.sortCol]}});return e.sort(function(t,e){return t.value>e.value?u.sortReverse?-1:1:t.value<e.value?u.sortReverse?1:-1:0}),e.map(function(e){return t[e.index]})}function l(e){var r={patient:e,definitions:u.definitions},i={templateUrl:"app/templates/modal.html",size:"lg",controller:"ModalCtrl as vm",scope:t,resolve:{obj:r}};a.open(i).result.then(function(t){},function(){})}var u=this;u.search="",u.sortCol="name",u.checkboxAll=!1,u.pageNum=1,u.sortReverse=!1,u.pplPerPage=10,u.gridColumns=screen.availWidth<500?[{display:"Name",search:"name",sort:"name",rotate:"name"},{display:"BMI",search:"bmi",sort:"bmi",rotate:"bmi"},{display:"Height (cm)",search:"heightCm",sort:"heightCm",rotate:"heightCm"},{display:"Weight (kg)",search:"weightKg",sort:"weightKg",rotate:"weightKg"},{display:"Category",search:"resultText",sort:"resultText",rotate:"resultText"}]:[{display:"Name",search:"name",sort:"name",rotate:"name"},{display:"BMI",search:"bmi",sort:"bmi",rotate:"bmi"},{display:"Height (cm)",search:"heightCm",sort:"heightCm",rotate:"heightCm"},{display:"Weight (kg)",search:"weightKg",sort:"weightKg",rotate:"weightKg"},{display:"Category",search:"resultText",sort:"resultText",rotate:"resultText"},{display:"Created",search:"Created",sort:"Created",rotate:"Created"}],u.showCreate=!(screen.availWidth<500),u.pagePatients=n,u.viewPatient=l,function(){u.patients=o.patients(),u.definitions=o.definitions();var t=u.definitions.filter(function(t){return"vigorous"===t.intensity}).map(function(t){return t.activity}),e=u.definitions.filter(function(t){return"moderate"===t.intensity}).map(function(t){return t.activity});u.patients.forEach(function(a){a.moderateTotal=a.summary.filter(function(t){return e.includes(t.activity.toLowerCase())}).map(function(t){return t.minutes}).reduce(function(t,e){return t+e},0),a.vigorousTotal=a.summary.filter(function(e){return t.includes(e.activity.toLowerCase())}).map(function(t){return t.minutes}).reduce(function(t,e){return t+e},0),a.moderateTotal>=150&&0===a.vigorousTotal?a.resultText="150 minutes of moderate activity":a.vigorousTotal>=75&&0===a.moderateTotal?a.resultText="75 minutes of vigorous activity":0!=a.vigorousTotal&&0!=a.moderateTotal?a.resultText="Mix of moderate and vigorous activity":a.resultText="Lacks activity"})}(),$(window).resize(function(){window.innerWidth,t.$apply(function(){u.gridColumns=window.innerWidth<500?[{display:"Name",search:"name",sort:"name",rotate:"name"},{display:"BMI",search:"bmi",sort:"bmi",rotate:"bmi"},{display:"Height (cm)",search:"heightCm",sort:"heightCm",rotate:"heightCm"},{display:"Weight (kg)",search:"weightKg",sort:"weightKg",rotate:"weightKg"},{display:"Category",search:"resultText",sort:"resultText",rotate:"resultText"}]:[{display:"Name",search:"name",sort:"name",rotate:"name"},{display:"BMI",search:"bmi",sort:"bmi",rotate:"bmi"},{display:"Height (cm)",search:"heightCm",sort:"heightCm",rotate:"heightCm"},{display:"Weight (kg)",search:"weightKg",sort:"weightKg",rotate:"weightKg"},{display:"Category",search:"resultText",sort:"resultText",rotate:"resultText"},{display:"Created",search:"Created",sort:"Created",rotate:"Created"}],u.showCreate=!(window.innerWidth<500)})})}])}(),function(){angular.module("McLarenApp").config(["$stateProvider",function(t){t.state("home",{controller:"HomeCtrl as vm",templateUrl:"app/home/home.html",data:{pageTitle:"Dashboard"},resolve:{allPatients:["DataService",function(t){return t.getAllPatients().then(function(t){return t.data})}],allDefinitions:["DataService",function(t){return t.getAllDefinitions().then(function(t){return t.data})}]}})}]).controller("HomeCtrl",["$scope","$localStorage","$state","DataService","allPatients","allDefinitions",function(t,e,a,r,i,o){var n=this;!function(){n.patients=i,n.definitions=o}()}])}();
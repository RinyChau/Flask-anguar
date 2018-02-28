var supplyChainApp = angular.module("supplyChainApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
]);


var SupplyChainCtrl = function($scope) {
    $scope.userName = $('#userName').val();
};

supplyChainApp.controller("SupplyChainCtrl",['$scope', SupplyChainCtrl]);

supplyChainApp
    .config(['$interpolateProvider', function($interpolateProvider) {
        $interpolateProvider.startSymbol('//');
        $interpolateProvider.endSymbol('//');
    }])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
        $httpProvider.defaults.xsrfCookieName = "csrftoken";
    }])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/homepage");
        $stateProvider
            .state('homepage', {
                url: "/",
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'supplyChainApp',
                            files: [
                                'static/js/SupplyChainCtrl.js',
                            ]
                        });
                    }]
                }
            });
    }]);

supplyChainApp.run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$state = $state;
}]);



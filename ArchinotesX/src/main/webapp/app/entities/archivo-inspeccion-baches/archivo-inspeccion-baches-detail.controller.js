(function() {
    'use strict';

    angular
        .module('archinotesxApp')
        .controller('ArchivoInspeccionBachesDetailController', ArchivoInspeccionBachesDetailController);

    ArchivoInspeccionBachesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'ArchivoInspeccionBaches', 'EstadoBaches'];

    function ArchivoInspeccionBachesDetailController($scope, $rootScope, $stateParams, entity, ArchivoInspeccionBaches, EstadoBaches) {
        var vm = this;
        vm.archivoInspeccionBaches = entity;
        
        var unsubscribe = $rootScope.$on('archinotesxApp:archivoInspeccionBachesUpdate', function(event, result) {
            vm.archivoInspeccionBaches = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
